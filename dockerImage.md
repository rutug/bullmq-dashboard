# 🐳 BullMQ Dashboard Docker Image

## 🚀 Description
The **BullMQ Dashboard** is a web app for easily managing and monitoring BullMQ queues and jobs.

## 📦 Usage
To use the BullMQ Dashboard, you need to build the Docker image and run the container with the appropriate environment variables. This will expose a web interface for managing your BullMQ queues.

### 🛠️ Sample Docker Run Command
Here’s a sample command to run the BullMQ Dashboard container:

```bash
docker run -d \
--restart unless-stopped \
--name bullmq-dashboard \
-e BASE_PATH="/admin/queues" \
-e REDIS_HOST="127.0.0.1" \
-e REDIS_PORT="6379" \
-e REDIS_PASSWORD="" \
-e REDIS_DB="0" \
-e QUEUES="test,tesr2" \
-p 3000:3000 \
bullmq-dashboard:latest
```

## 🌍 Accessing the Dashboard
Once the container is running, you can access the BullMQ dashboard at:
```
http://localhost:3000/admin/queues
```

## 🔧 Environment Variables
The following environment variables are required when running the container:

- `BASE_PATH`: The base path for the Bull Board interface (default: `/admin/queues`).
- `REDIS_HOST`: The hostname of the Redis server (default: `127.0.0.1`).
- `REDIS_PORT`: The port on which the Redis server is running (default: `6379`).
- `REDIS_PASSWORD`: The password for the Redis server (if applicable).
- `REDIS_DB`: The Redis database number to use (default: `0`).
- `QUEUES`: A comma-separated list of queue names to initialize.

## 🎉 Enjoy managing your BullMQ queues with ease!

