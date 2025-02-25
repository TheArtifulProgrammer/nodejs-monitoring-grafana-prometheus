const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const promClient = require("prom-client");
const logger = require("./logger");

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestCounter);

// Middleware for metrics
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const path = req.route ? req.route.path : req.path;

    httpRequestDurationMicroseconds
      .labels(req.method, path, res.statusCode)
      .observe(duration / 1000);

    httpRequestCounter.labels(req.method, path, res.statusCode).inc();

    logger.info(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: duration,
      path: path,
    });
  });

  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("MongoDB connection error:", err);
  });

// Define a simple schema
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", ItemSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Items CRUD endpoints
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    logger.error("Error fetching items:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    logger.error("Error creating item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (error) {
    logger.error("Error fetching item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);
  } catch (error) {
    logger.error("Error updating item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    logger.error("Error deleting item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
