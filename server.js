const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const port = process.env.PORT || 3000;
const app = require('./index');

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Connected to DB!');
})

app.listen(port, () => {
  console.log(`Server ran at port ${port}!`);
})