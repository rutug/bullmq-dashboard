# bullmq-dashboard

## Description
bullmq-dashboard is a web application that provides a user interface for managing BullMQ queues. It allows you to monitor and manage your queues easily through a web interface, making it simpler to visualize the state of your jobs and queues.

## Author
Rutwek Hirwe

## Usage
To run the application, you need to build the Docker image and then run the container with the appropriate environment variables. The application will expose a web interface for managing BullMQ queues.

## Run Command
To run the application, use the following command:

```bash
docker run -d \
--restart unless-stopped \
--name your-container-name \
-e BASE_PATH="your-base-path" \
-e REDIS_HOST="your-redis-host" \
-e REDIS_PORT="your-redis-port" \
-e QUEUES="your-queues" \
-e REDIS_DB="your-redis-db" \
-p your-port:3000 \
bullmq-dashboard:latest
```

## Environment Variables
The following environment variables are expected while running the container:

- `BASE_PATH`: The base path for the Bull Board interface (default: `/admin/queues`).
- `REDIS_HOST`: The hostname of the Redis server (default: `127.0.0.1`).
- `REDIS_PORT`: The port on which the Redis server is running (default: `6379`).
- `REDIS_PASSWORD`: The password for the Redis server (if applicable).
- `REDIS_DB`: The Redis database number to use (default: `0`).
- `QUEUES`: A comma-separated list of queue names to initialize.

## Accessing the Dashboard
Once the container is running, you can access the BullMQ dashboard at `http://localhost:your-port/your-base-path`.
