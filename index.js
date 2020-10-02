const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const { countReset } = require('console');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

//set handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs'); 
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://itshpit:kVoFTHqKvT4Q2GjI@cluster0.jgyce.mongodb.net/shop';
        await mongoose.connect(url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();