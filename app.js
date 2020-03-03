const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

//Controllers
const auth_controller = require('./controllers/auth_controller');
const shoppingList_controller = require('./controllers/shoppingList_controller');

const product_controller = require('./controllers/product_controller');

let app = express();

app.use(body_parser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'shopping/1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

//Serve Static files
app.use('/styles', express.static('styles'))

//Auth
app.use(auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);


//shoppingLists
app.get('/', is_logged_handler, shoppingList_controller.get_shoppingLists);
app.post('/delete-shoppingList', is_logged_handler, shoppingList_controller.post_delete_shoppingList);
app.get('/shoppingList/:id', is_logged_handler, shoppingList_controller.get_shoppingList);
app.post('/add-shoppingList', is_logged_handler, shoppingList_controller.post_shoppingList);


app.get('/shoppingList/:id', is_logged_handler, shoppingList_controller.get_procuct);


app.use((req, res, next) => {
    res.status(404);
    res.send(`
        page not found
    `);
});

const mongoose_url = 'mongodb+srv://memoappdb:bTRE53AvKm4x0wT0@cluster0-wk8t5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.listen(PORT);
});