require('dotenv').config();

module.exports = {
  dev: {
    username: process.env.DATABASE_DEV_USERNAME,
    password: process.env.DATABASE_DEV_PASSWORD,
    database: process.env.DATABASE_DEV_NAME,
    host: process.env.DATABASE_DEV_HOST,
    port: process.env.DATABASE_DEV_PORT,
    dialect: 'mysql',
    
  },
  test: {
    username: process.env.DATABASE_TEST_TEST_USERNAME,
    password: process.env.DATABASE_TEST_TEST_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    host: process.env.DATABASE_TEST_HOST,
    port: process.env.DATABASE_TEST_PORT,
    dialect: 'mysql'
  },
  prod: {
    username: process.env.DATABASE_PROD_USERNAME,
    password: process.env.DATABASE_PROD_PASSWORD,
    database: process.env.DATABASE_PROD_NAME,
    host: process.env.DATABASE_PROD_HOST,
    port: process.env.DATABASE_PROD_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
    define: {
      timestamps: false,
    },
    
  }
};