# News Aggregator

This document provides instructions on how to run the frontend application using Docker containers. This project aggregates news from this different APIs; NewsApi.org, New York Times, and The Guardian. It allows users to search for articles by keyword and filter the results by date, category, and source.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```
news-aggregator/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── NewsCard.tsx
│   │   ├── NewsList.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── UserPreferences.tsx
│   │   └── Footer.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── newsApiService.ts
│   │   ├── guardianApiService.ts
│   │   └── nytApiService.ts
│   ├── interfaces/
│   │   ├── Article.ts
│   │   ├── NewsSource.ts
│   │   └── UserPreferences.ts
│   ├── hooks/
│   │   ├── useNewsArticles.ts
│   │   └── useUserPreferences.ts
│   ├── context/
│   │   └── UserPreferencesContext.tsx
│   ├── App.tsx
│   └── index.tsx
├── public/
│   ├── index.html
│   └── assets/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

The project consists of the following key files for Docker containerization:

- `Dockerfile`: Defines how the application is built and packaged
- `docker-compose-dev.yml`: Orchestrates the container setup with appropriate configurations
- `.env.local`: Contains environment variables needed by the application it is not currently being ignored by gitignore and this behaviour is by design.

## Setup Instructions

### 1. Building and Running the Container

To build and start the containerized application:

```bash
# Build and start the container in detached mode
docker-compose -f docker-compose-dev.yml up --build

# View logs if needed
docker-compose logs -f
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 2. Stopping the Container

To stop the running containers:

```bash
docker-compose down
```

## Docker Configuration Details

### Dockerfile

Our Dockerfile uses a multi-stage build process to create an optimized production image:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### docker-compose-dev.yml

The docker-compose.yml file sets up the service with the following configurations:

```yaml
version: '3.9'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: frontend
    restart: always
    ports:
      - 3000:3000
    volumes:
      - .:/app
      - /app/node_modules
    env_file:
      - .env.local
    networks:
      - network
networks:
  network:
```

## Troubleshooting

### 404 Errors

If you encounter 404 errors, ensure the `--single` flag is included in the serve command in the Dockerfile to handle client-side routing properly.

### Orphaned Containers

If Docker Compose warns about orphaned containers, use the `--remove-orphans` flag:

```bash
docker-compose up --remove-orphans
```

### Volume Issues

If you make changes to the code but don't see them reflected, you may need to rebuild the Docker image:

```bash
docker-compose build --no-cache
docker-compose up -d
```

## Development vs Production

The current setup is optimized For development with hot-reloading, For production

1. Modify the docker-compose-dev.yml to use a production command instead
2. Consider creating a separate docker-compose.yml file for production-specific settings
3. The newsApi api-key can only be use in a development environment as it requires a paid version on production

## Further Assistance

For more information about Docker configurations, refer to:

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
