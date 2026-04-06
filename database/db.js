const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'tarix.db');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database with schema
function initializeDatabase() {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

    db.exec(schema, (err) => {
        if (err) {
            console.error('Error creating tables:', err.message);
        } else {
            console.log('Database tables initialized successfully');
        }
    });
}

// Helper function to run parameterized queries
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, changes: this.changes });
            }
        });
    });
}

// Helper function to get a single row
function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Helper function to get all rows
function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Close database connection
function close() {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Database connection closed');
                resolve();
            }
        });
    });
}

module.exports = {
    db,
    run,
    get,
    all,
    close
};
