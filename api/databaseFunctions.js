const database = require('./database.js');

// Function to add a new user
const addUser = (username, password) => {
  const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';

  return new Promise((resolve, reject) => {
    database.db.run(insertUserQuery, [username, password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(`Added new user with ID: ${this.lastID}`);
      }
    });
  });
};


// Function to get available exchange rates for a specific currency ID
const getExchangeRatesForCurrency = (currencyId) => {
  const query = `
    SELECT
      er.id AS exchange_rate_id,
      c2.id AS target_currency_id, 
      c1.currencyCode AS base_currency_code,
      c2.currencyCode AS target_currency_code,
      er.rate
    FROM
      exchange_rates er
    JOIN
      currency_pairs cp ON er.id = cp.id
    JOIN
      currencies c1 ON cp.baseCurrencyId = c1.id
    JOIN
      currencies c2 ON cp.targetCurrencyId = c2.id
    WHERE
      c1.id = ?
  `;

  return new Promise((resolve, reject) => {
    database.db.all(query, currencyId, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


// Function to check if a user with a given username and password exists
const checkUserCredentials = (username, password) => {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  return new Promise((resolve, reject) => {
    database.db.get(query, [username, password], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row) {
          resolve(row);
        } else {
          resolve(null);
        }
      }
    });
  });
};

// Function to get all currencies
const getAllCurrencies = () => {
  const query = 'SELECT * FROM currencies';
  return new Promise((resolve, reject) => {
    database.db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Update Currency by id
const updateCurrencyById = (currencyId, name, code, symbol) => {
  const query = `
    UPDATE currencies
    SET name = ?, currencyCode = ?, symbol = ?
    WHERE id = ?;
  `;

  return new Promise((resolve, reject) => {
    database.db.run(query, [name, code, symbol, currencyId], function (err) {
      if (err) {
        reject(err);
      } else if (this.changes > 0) {
        resolve({ id: currencyId, name, code, symbol });
      } else {
        resolve(null);
      }
    });
  });
}
// Delete currency by id
const deleteCurrencyById = (currencyId) => {
  const query = `
    DELETE FROM currencies
    WHERE id = ?;
  `;

  return new Promise((resolve, reject) => {
    database.db.run(query, [currencyId], function (err) {
      if (err) {
        reject(err);
      } else if (this.changes > 0) {
        resolve({ id: currencyId });
      } else {
        resolve(null);
      }
    });
  });
}

// Function to get all exchange rates
const getAllExchangeRates = () => {
    const query = `
        SELECT
        er.id AS exchange_rate_id,
        c1.currencyCode AS base_currency_code,
        c2.currencyCode AS target_currency_code,
        er.rate
      FROM
        exchange_rates er
      JOIN
        currency_pairs cp ON er.id = cp.id
      JOIN
        currencies c1 ON cp.baseCurrencyId = c1.id
      JOIN
        currencies c2 ON cp.targetCurrencyId = c2.id
      `;
    return new Promise((resolve, reject) => {
      database.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

   const getExchangeRate = (id) => {
    const query = `
        SELECT
        er.id AS exchange_rate_id,
        c1.currencyCode AS base_currency_code,
        c2.currencyCode AS target_currency_code,
        er.rate
      FROM
        exchange_rates er
      JOIN
        currency_pairs cp ON er.id = cp.id
      JOIN
        currencies c1 ON cp.baseCurrencyId = c1.id
      JOIN
        currencies c2 ON cp.targetCurrencyId = c2.id
      WHERE er.id = ?
      `;
    return new Promise((resolve, reject) => {
      database.db.all(query, [id],(err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

// Function to delete an exchange rate by ID and update the currency_pairs table
const deleteExchangeRate = (exchangeRateId) => {
    const deleteExchangeRateQuery = 'DELETE FROM exchange_rates WHERE id = ?';
    const deleteCurrencyPairQuery = 'DELETE FROM currency_pairs WHERE id = ?';
  
    return new Promise((resolve, reject) => {
      database.db.run(deleteCurrencyPairQuery, [exchangeRateId], function (err) {
          if (err) {
            reject(err);
          } else {
            database.db.run(deleteExchangeRateQuery, [exchangeRateId], function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(`Deleted exchange rate with ID: ${exchangeRateId}`);
              }
            });
          }
        });
    });
  };

// Function to add an exchange rate and update the currency_pairs table
const addExchangeRate = (baseCurrencyId, targetCurrencyId, rate) => {
    const insertExchangeRateQuery = 'INSERT INTO exchange_rates (rate) VALUES (?)';
    const insertCurrencyPairQuery =
      'INSERT INTO currency_pairs (baseCurrencyId, targetCurrencyId) VALUES (?, ?)';
  
    return new Promise((resolve, reject) => {
      database.db.run(insertExchangeRateQuery, [rate], function (err) {
        if (err) {
          reject(err);
        } else {
          const exchangeRateId = this.lastID;
          database.db.run(insertCurrencyPairQuery, [baseCurrencyId, targetCurrencyId], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(`Added exchange rate with ID: ${exchangeRateId}`);
            }
          });
        }
      });
    });
  };

  
 const updateExchangeRateById = (id, newRate) => {
  const query = `
    UPDATE exchange_rates
    SET rate = ?
    WHERE id = ?;
  `;

  return new Promise((resolve, reject) => {
    database.db.run(query, [newRate, id], function (err) {
      if (err) {
        reject(err);
      } else {
        // Check if the update was successful
        if (this.changes > 0) {
          resolve({ message: 'Exchange rate updated successfully' });
        } else {
          reject(new Error('Exchange rate not found'));
        }
      }
    });
  });
}

const currencyPairExists = (baseCurrencyId, targetCurrencyId) => {
  const query = `
    SELECT COUNT(*) AS count
    FROM currency_pairs
    WHERE baseCurrencyId = ? AND targetCurrencyId = ?;
  `;

  return new Promise((resolve, reject) => {
    database.db.get(query, [baseCurrencyId, targetCurrencyId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
}

const addCurrency = (name, code, symbol) => {
  const query = `
    INSERT INTO currencies (name, currencyCode, symbol)
    VALUES (?, ?, ?);
  `;

  return new Promise((resolve, reject) => {
    database.db.run(query, [name, code, symbol], function (err) {
      if (err) {
        reject(err);
      } else {
        const newCurrencyId = this.lastID;
        resolve({ id: newCurrencyId, name, code, symbol });
      }
    });
  });
}
  
module.exports = {addUser, checkUserCredentials, getExchangeRatesForCurrency, 
  getAllCurrencies,currencyPairExists,addCurrency,updateCurrencyById, updateExchangeRateById,
  getExchangeRate,getAllExchangeRates , deleteExchangeRate ,deleteCurrencyById, addExchangeRate  };