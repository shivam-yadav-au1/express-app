const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sequelize = require('./sequelize');
const db = require('./config/db.config');
const port = process.env.PORT || 3000;
dotenv.config({
    path: './config.env'
});

async function assertDatabaseConnectionOk(){
    console.log(`Checking Mysql database connection...`);
    try{
        await sequelize.authenticate();
        console.log(`Database connection OK!`);
    }catch(error){
        console.log('Unable to connect to the Mysql database.');
        console.log(error.message);
        process.exit(1);
    }
}

async function initMySqlDatabase(){
    await assertDatabaseConnectionOk();
    console.log(`Starting Sequelize + Express example on port ${port}...`);
}


// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION!!! shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

const app = require('./app');

const mongoDatabase = process.env.DATABASE;

// Connect the database
mongoose.connect(mongoDatabase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('Mongo DB connection Successfully!');
});

// force: true will drop the table if it already exists
sequelize.sync({force: false}).then(() => {
 console.log('Drop and Resync with { force: false }');
});
   


// Start the server

app.listen(port, () => {
    initMySqlDatabase();
    console.log(`Application is running on port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err);
    server.close(() => {
        process.exit(1);
    });
});