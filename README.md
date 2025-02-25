# NodeJS Application Monitoring with Prometheus and Grafana

The application is containerized using Docker, with services orchestrated via Docker Compose. This ensures consistent deployment across different environments.

> **⚠️Security Note:** This approach should be used only in development mode. For production, please use the implementation in the [master-prod branch](https://github.com/TheArtifulProgrammer/nodejs-monitoring-grafana-prometheus/tree/master-prod).

## Components

### Backend (Express.js)

- RESTful API service built with Express.js
- MongoDB integration for data persistence
- Prometheus metrics instrumentation
- Structured logging with Winston

### Frontend (React)

- User interface built with React
- Axios for API communication
- Served via Nginx

### Database (MongoDB)

- NoSQL database for storing application data
- Initial data seeding through init script

### Monitoring Stack

- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboarding
- **Loki**: Log aggregation and storage
- **Promtail**: Log collection agent
- **cAdvisor**: Container metrics collection
- **Node Exporter**: Host system metrics collection

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

1. Clone the repository

```bash
git clone https://github.com/TheArtifulProgrammer/nodejs-monitoring-grafana-prometheus
cd nodejs-monitoring-grafana-prometheus
```

2. Install dependencies

```bash
npm install
```

3. Run with Docker Compose

```bash
docker-compose up -d
```

## Services

- Node.js API: <http://localhost:3000>
- Prometheus: <http://localhost:9090>
- Grafana: <http://localhost:3001>

## Monitoring Setup

The application includes:

- Custom metrics endpoints
- Default Node.js metrics
- HTTP request metrics
- System resource metrics

## Configuration

Configuration files can be found in:

- `/config` - Application configuration
- `/prometheus` - Prometheus configuration
- `/grafana` - Grafana dashboards

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Future Improvements

- Add more custom metrics
- Implement alert rules
- Add more detailed dashboards
- Include logging integration
- Add trace sampling

## Author

Munashe Chinake
<https://theartfulprogrammer.com/>

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Prometheus team
- Grafana team
- Node.js community
