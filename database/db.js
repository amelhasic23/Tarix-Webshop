const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'tarix.db');

let db = null;
let SQL = null;

// Initialize sql.js and database
async function initDatabase() {
    if (db) return db;

    try {
        // Initialize sql.js WASM
        SQL = await initSqlJs();
        console.log('sql.js WASM loaded');

        // Load existing database if it exists
        if (fs.existsSync(DB_PATH)) {
            const fileBuffer = fs.readFileSync(DB_PATH);
            db = new SQL.Database(fileBuffer);
            console.log('Loaded existing database');
        } else {
            db = new SQL.Database();
            console.log('Created new database');
            // Initialize schema
            const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
            db.run(schema);
            console.log('Database schema initialized');
            saveDatabase();
        }

        return db;
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Save database to disk
function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(DB_PATH, buffer);
    }
}

// Helper function to run parameterized queries (INSERT, UPDATE, DELETE)
async function run(sql, params = []) {
    await initDatabase();
    try {
        db.run(sql, params);
        saveDatabase();

        // Get last insert ID if applicable
        const metaResult = db.exec('SELECT last_insert_rowid(), changes()');
        const lastId = metaResult.length > 0 ? (metaResult[0].values[0][0] || 0) : 0;
        const changes = metaResult.length > 0 ? (metaResult[0].values[0][1] || 0) : 0;

        return { id: lastId, changes };
    } catch (error) {
        console.error('SQL run error:', error);
        throw error;
    }
}

// Helper function to get a single row
async function get(sql, params = []) {
    await initDatabase();
    try {
        const stmt = db.prepare(sql);
        stmt.bind(params);

        if (stmt.step()) {
            const row = stmt.getAsObject();
            stmt.free();
            return row;
        }
        stmt.free();
        return undefined;
    } catch (error) {
        console.error('SQL get error:', error);
        throw error;
    }
}

// Helper function to get all rows
async function all(sql, params = []) {
    await initDatabase();
    try {
        const stmt = db.prepare(sql);
        stmt.bind(params);

        const rows = [];
        while (stmt.step()) {
            rows.push(stmt.getAsObject());
        }
        stmt.free();
        return rows;
    } catch (error) {
        console.error('SQL all error:', error);
        throw error;
    }
}

// Close database connection
async function close() {
    if (db) {
        saveDatabase();
        db.close();
        db = null;
        console.log('Database connection closed');
    }
}

// Initialize on module load
initDatabase().catch(console.error);

module.exports = {
    initDatabase,
    run,
    get,
    all,
    close,
    saveDatabase
};
