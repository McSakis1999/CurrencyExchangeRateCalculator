const sqlite3 = require('sqlite3').verbose();

//connect to database
const db = new sqlite3.Database('data.db',sqlite3.OPEN_READWRITE,(err) => {
    if(err) return console.error(err.message);
});


// Create tables

// Run statements in sequence
// db.serialize(() => {
    
    // // Create the "users" table if it doesn't exist
    // db.run(`
    // CREATE TABLE IF NOT EXISTS users (
    //     id INTEGER PRIMARY KEY,
    //     username TEXT NOT NULL UNIQUE,
    //     password TEXT NOT NULL
    // )
    // `);

    // // Create the "currencies" table if it doesn't exist
    // db.run(`
    // CREATE TABLE IF NOT EXISTS currencies (
    //     id INTEGER PRIMARY KEY,
    //     currencyCode TEXT NOT NULL,
    //     name TEXT NOT NULL,
    //     symbol TEXT NOT NULL
    // )
    // `);

    // // Create the "exchange_rates" table if it doesn't exist
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS exchange_rates (
    //     id INTEGER PRIMARY KEY,
    //     rate REAL NOT NULL
    //     )
    // `);

    // db.run(`
    // CREATE TABLE IF NOT EXISTS currency_pairs (
    //     id INTEGER PRIMARY KEY,
    //     baseCurrencyId INTEGER NOT NULL,
    //     targetCurrencyId INTEGER NOT NULL,
    //     FOREIGN KEY (baseCurrencyId) REFERENCES currencies(id),
    //     FOREIGN KEY (targetCurrencyId) REFERENCES currencies(id)
    // )
    // `);

    // Insert data

    // db.run(`
    //     INSERT INTO currencies (currencyCode, name, symbol)
    //     VALUES
    //     ('EUR', 'Euro', '€'),
    //     ('USD', 'United States Dollar', '$'),
    //     ('CHF', 'Swiss Franc', '₣'),
    //     ('GBP', 'Pound Sterling', '£'),
    //     ('JPY', 'Japanese Yen', '¥'),
    //     ('CAD', 'Canadian Dollar', '$')
    //     `, (err) => {
    //     if (err) {
    //         console.error('Error inserting data:', err);
    //     }});

    // db.run(`
    //     INSERT INTO exchange_rates (rate)
    //     VALUES
    //     (1.3764),
    //     (1.2079),
    //     (0.8731),
    //     (76.7200),
    //     (1.1379),
    //     (1.5648)
    //     `, (err) => {
    //     if (err) {
    //         console.error('Error inserting data:', err);
    //     }});

    //     // Insert data into the "currency_pairs" table
    // db.run(`
    //     INSERT INTO currency_pairs (baseCurrencyId, targetCurrencyId)
    //     VALUES
    //     (1, 2), -- EUR to USD
    //     (1, 3), -- EUR to CHF
    //     (1, 4), -- EUR to GBP
    //     (2, 5), -- USD to JPY
    //     (3, 2), -- CHF to USD
    //     (4, 6)  -- GBP to CAD
    //     `, (err) => {
    //     if (err) {
    //         console.error('Error inserting data:', err);
    //     }});
// });

module.exports = {db};