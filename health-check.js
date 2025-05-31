#!/usr/bin/env node

// Health check script for Docker containers
// This script can be used as a Docker HEALTHCHECK command

const http = require('http');
const fs = require('fs');
const path = require('path');

const HEALTH_CHECK_PORT = process.env.HEALTH_CHECK_PORT || 3000;
const LOG_FILE = path.join(__dirname, 'logs', 'health.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    
    console.log(logMessage.trim());
    
    // Ensure logs directory exists
    const logDir = path.dirname(LOG_FILE);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    
    fs.appendFileSync(LOG_FILE, logMessage);
}

// Simple HTTP server for health checks
const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: require('./package.json').version
        }));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Only start server if this script is run directly
if (require.main === module) {
    server.listen(HEALTH_CHECK_PORT, () => {
        log(`Health check server running on port ${HEALTH_CHECK_PORT}`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
        log('Received SIGTERM, shutting down gracefully');
        server.close(() => {
            process.exit(0);
        });
    });
}

module.exports = { server, log };
