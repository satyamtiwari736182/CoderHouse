const mongoose = require('mongoose')
function DbConnect() {
    const DB_URL = process.env.DB_URL

    //database connection
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    //Instance of DataBase
    const db = mongoose.connection;

    // Adding Event on database
    db.on('error', console.error.bind(console, 'Database Connection Error'))
    db.once('open', () => {
        console.log('Database connected Successfully...')
    })
}

module.exports = DbConnect