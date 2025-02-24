// This script initializes the MongoDB database with some sample data
db = db.getSiblingDB("myapp");

db.createCollection("items");

db.items.insertMany([
  {
    name: "Sample Item 1",
    description: "This is a sample item to get started.",
    created: new Date(),
  },
  {
    name: "Sample Item 2",
    description: "Another example item.",
    created: new Date(),
  },
]);

print("MongoDB initialization complete!");
