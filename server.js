const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const sequelize = require("./config/database");

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
const port = process.env.APP_PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});