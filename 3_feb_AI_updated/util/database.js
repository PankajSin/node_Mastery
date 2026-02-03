import pg from 'pg';

// Create a pool to manage multiple connections
const pool = new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'ai_logger_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    max: 10,              // Maximum number of clients in the pool
    idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
});

// Export the pool so models can use it
export default pool;
