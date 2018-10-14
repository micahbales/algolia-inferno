require('dotenv').config({ path: __dirname + '/../.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

const App = require('../models/App');

const apps = JSON.parse(fs.readFileSync(__dirname + '/apps.json', 'utf-8'));

async function deleteData() {
  await App.deleteMany();
  console.log('Data Deleted');
  process.exit();
}

async function loadData() {
  try {
    await App.insertMany(apps);
    console.log('Apps Inserted');
    process.exit();
  } catch(e) {
    console.log(`\nError! The Error info is below but make sure to drop 
        the existing database first (npm run deletedb)`);
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
