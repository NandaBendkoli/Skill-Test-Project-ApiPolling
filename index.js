const express = require('express');
const port = 8000;
const app = express();
// for mongoDB data base connection setup
const db = require("./config/mongoose");
const MongoStore = require("connect-mongo");

// for creating session

const session = require('express-session');

app.use(express.urlencoded());

app.use(session({
    name: 'polling',
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://bendkolinanda12:Nanda123@cluster0.sj5feyg.mongodb.net/api-polling?retryWrites=true&w=majority',
            mongooseConnection: db,
            autoRemove: false
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));




// use express router
app.use('/', require('./routes'));

// port listening on port

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in connection the database ${err}`);
        return;
    }
    console.log(`Server is running at the port ${port}`);
})



