require('dotenv').config();
module.exports = {
    development: {
        username: "group36@group36",
        password: "Safak36!",
        database: "postgres",
        host: "group36.postgres.database.azure.com",
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        }
    },
    test: {
        username: "group36@group36",
        password: "Safak36!",
        database: "group36",
        host: "group36.postgres.database.azure.com",
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        }
    },
    production: {
        username: "group36",
        password: "Safak36!",
        database: "group36",
        host: "group36.postgres.database.azure.com",
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        }
    }
};