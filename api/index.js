const dbFunctions = require('./databaseFunctions');

// Initialazing local server & modules
const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const PORT = 8080;
const app = express();

// Express json middleware & utility
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.listen(
    PORT,
    () => console.log(`Api alive on localhost:${PORT}`)
);

// APIS

    //User Sign-Up and Login APIS
        
        // API endpoint for user signup
        app.post('/signup', (req, res) => {
            const { username, password } = req.body;
    
            dbFunctions.addUser(username, password)
                .then((message) => {
                    res.status(201).json({ message: 'User created successfully', data: { username } });
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Error creating user', error: err.message });
                });
        });

        // API endpoint to check user credentials
        app.post('/login', (req, res) => {
            const { username, password } = req.body;
        
            dbFunctions.checkUserCredentials(username, password)
            .then((user) => {
                if (user) {
                    res.status(200).json({ message: 'Login successful', user });
                } else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error checking user credentials', error: err.message });
            });
        });

    // Currency and Exchange Rate APIS
    
        // API endpoint to get all currencies
        app.get('/currencies', (req, res) => {
            // Call the getAllCurrencies function to retrieve all currencies
            dbFunctions.getAllCurrencies()
            .then((currencies) => {
                res.status(200).json({ currencies });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error getting currencies', error: err.message });
            });
        });
        
        // API endpoint to add a new currency
        app.post('/addCurrency', (req, res) => {
            const { name, code, symbol } = req.body;
          
            if (!name || !code || !symbol) {
                return res.status(400).json({ error: 'Name, code, and symbol are required' });
            }
        
            dbFunctions.addCurrency(name, code, symbol)
            .then((newCurrency) => {
                res.status(201).json(newCurrency);
            })
            .catch((error) => {
                console.error('Error adding currency:', error);
                res.status(500).json({ error: 'Error adding currency' });
            });
        });

        // API endpoint to update a currency by ID
        app.put('/update-currency/:id', (req, res) => {
            const currencyId = req.params.id;
            const { name, code, symbol } = req.body;
        
            if (!name || !code || !symbol) {
            return res.status(400).json({ error: 'Name, code, and symbol are required' });
            }
        
            dbFunctions.updateCurrencyById(currencyId, name, code, symbol)
            .then((updatedCurrency) => {
                if (updatedCurrency) {
                res.json(updatedCurrency);
                } else {
                res.status(404).json({ error: 'Currency not found' });
                }
            })
            .catch((error) => {
                console.error('Error updating currency:', error);
                res.status(500).json({ error: 'Error updating currency' });
            });
        });

        // API endpoint to delete a currency by ID
        app.delete('/delete-currency/:id', (req, res) => {
            const currencyId = req.params.id;
        
            dbFunctions.deleteCurrencyById(currencyId)
            .then((deletedCurrency) => {
                if (deletedCurrency) {
                res.json(deletedCurrency);
                } else {
                res.status(404).json({ error: 'Currency not found' });
                }
            })
            .catch((error) => {
                console.error('Error deleting currency:', error);
                res.status(500).json({ error: 'Error deleting currency' });
            });
        });

        // API endpoint to get exchange rates by currency ID
        app.get('/exchange-rates/:currencyId', (req, res) => {
            const currencyId = parseInt(req.params.currencyId);
            
            dbFunctions.getExchangeRatesForCurrency(currencyId)
            .then((exchangeRates) => {
                res.status(200).json({ exchangeRates });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error getting exchange rates', error: err.message });
            });
        });

        // API endpoint to get all exchange rates
        app.get('/exchange-rates', (req, res) => {
   
            dbFunctions.getAllExchangeRates()
            .then((exchangeRates) => {
                res.status(200).json({ exchangeRates });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error getting exchange rates', error: err.message });
            });
        });

        // API endpoint to get a specific exchange rate by id
        app.get('/specific-exchange-rate/:exid', (req, res) => {
            const exchange_rate_id = parseInt(req.params.exid);
            
            dbFunctions.getExchangeRate(exchange_rate_id)
            .then((exchangeRates) => {
                res.status(200).json({ exchangeRates });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error getting exchange rates', error: err.message });
            });
        });

        // API endpoint to delete an exchange rate by ID
        app.delete('/exchange-rates/:exchangeRateId', (req, res) => {
            const exchangeRateId = parseInt(req.params.exchangeRateId);
        
            dbFunctions.deleteExchangeRate(exchangeRateId)
            .then((message) => {
                res.status(200).json({ message });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error deleting exchange rate', error: err.message });
            });
        });

        // API endpoint to check if a currency pair exists
        app.post('/currency-pairs/exist', (req, res) => {
            const { BaseCurrencyId, TargetCurrencyId } = req.body;
            
            if (!BaseCurrencyId || !TargetCurrencyId) {
                return res.status(400).json({ error: 'Both baseCurrencyId and targetCurrencyId are required' });
            }
        
            dbFunctions.currencyPairExists(parseInt(BaseCurrencyId), parseInt(TargetCurrencyId))
            .then((exists1) => {
            return dbFunctions.currencyPairExists(parseInt(TargetCurrencyId), parseInt(BaseCurrencyId))
                .then((exists2) => {
                const exists = exists1 || exists2;
                res.json({ exists });
                });
            })
            .catch((err) => {
                res.status(500).json({ error: 'Error checking currency pair existence', message: err.message });
            });
        });

        // API endpoint to add an exchange rate
        app.post('/addExchangeRate', (req, res) => {
            const { baseCurrencyId, targetCurrencyId, rate } = req.body;
      
            dbFunctions.addExchangeRate(baseCurrencyId, targetCurrencyId, rate)
            .then((message) => {
                res.status(201).json({ message });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error adding exchange rate', error: err.message });
            });
        });

        // API endpoint to update an exchange rate by id
        app.put('/update-exchange-rate/:id', (req, res) => {
            const { id } = req.params;
            const { rate } = req.body;
            try {
              dbFunctions.updateExchangeRateById(id, rate);
              res.json({ message: 'Exchange rate updated successfully' });
            } catch (error) {
              console.error('Error updating exchange rate:', error);
              res.status(500).json({ error: 'Error updating exchange rate' });
            }
          });
          