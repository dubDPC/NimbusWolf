# NimbusWolf Database Setup

## Docker Compose Services

This project uses Docker Compose to run isolated instances of PostgreSQL and Redis to avoid conflicts with other databases.

### Services Configuration

| Service | Port | Container Name | Purpose |
|---------|------|----------------|---------|
| PostgreSQL | **5433** (external) → 5432 (internal) | nimbuswolf-postgres | Main database |
| Redis | **6380** (external) → 6379 (internal) | nimbuswolf-redis | Cache & queues |
| PgAdmin | **5051** (external) → 80 (internal) | nimbuswolf-pgadmin | Database management UI |

### Database Credentials

**PostgreSQL:**
- Host: `localhost`
- Port: `5433` (custom to avoid conflicts)
- Database: `nimbuswolf_dev`
- Username: `nimbuswolf`
- Password: `nimbuswolf_dev_password`

**Redis:**
- Host: `localhost`
- Port: `6380` (custom to avoid conflicts)

**PgAdmin (Optional):**
- URL: `http://localhost:5051`
- Email: `admin@nimbuswolf.local`
- Password: `admin`

## Quick Start

### 1. Start the databases
```bash
docker-compose up -d
```

### 2. Check status
```bash
docker-compose ps
```

### 3. View logs
```bash
docker-compose logs -f
```

### 4. Run Prisma migrations
```bash
cd backend
npx prisma migrate dev --name init
```

### 5. Generate Prisma client
```bash
npx prisma generate
```

### 6. (Optional) Open Prisma Studio to view data
```bash
npx prisma studio
```

## Database Management

### Using PgAdmin
1. Open browser to `http://localhost:5051`
2. Login with credentials above
3. Add new server:
   - Name: NimbusWolf
   - Host: `nimbuswolf-postgres` (or `localhost`)
   - Port: `5432` (internal) or `5433` (if connecting from host)
   - Username: `nimbuswolf`
   - Password: `nimbuswolf_dev_password`

### Using psql directly
```bash
docker exec -it nimbuswolf-postgres psql -U nimbuswolf -d nimbuswolf_dev
```

### Using Redis CLI
```bash
docker exec -it nimbuswolf-redis redis-cli
```

## Stopping and Cleanup

### Stop services (keeps data)
```bash
docker-compose stop
```

### Stop and remove containers (keeps data volumes)
```bash
docker-compose down
```

### Remove everything including data volumes (CAUTION!)
```bash
docker-compose down -v
```

## Troubleshooting

### Port already in use
If ports 5433, 6380, or 5051 are already in use, edit `docker-compose.yml` and change the external ports (left side of the colon).

Example:
```yaml
ports:
  - "5434:5432"  # Changed from 5433 to 5434
```

Then update `backend/.env`:
```
DATABASE_URL="postgresql://nimbuswolf:nimbuswolf_dev_password@localhost:5434/nimbuswolf_dev"
```

### Check if services are healthy
```bash
docker-compose ps
```

Look for "healthy" status in the STATE column.

### Reset database
```bash
docker-compose down -v
docker-compose up -d
cd backend
npx prisma migrate dev --name init
```
