# NodeJS Application Monitoring with Prometheus and Grafana

A comprehensive Node.js application demonstrating monitoring and observability using Prometheus and Grafana.

## Overview

This project showcases how to implement monitoring in a Node.js application using industry-standard tools. It provides real-time metrics, visualization, and alerting capabilities.

## Features

- Node.js REST API with built-in metrics
- Prometheus metrics integration
- Grafana dashboards for visualization
- Docker containerization
- Performance monitoring
- Request/Response metrics
- Error tracking
- Resource utilization metrics

## Prerequisites

- Docker and Docker Compose
- Node.js 14.x or higher
- npm or yarn package manager

## Quick Start

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
