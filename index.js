const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth');
const { countReset } = require('console');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const User = require('./models/user');
const varMiddleware = require('./middleware/variables');

const MONGODB_URI = 'mongodb+srv://itshpit:kVoFTHqKvT4Q2GjI@cluster0.jgyce.mongodb.net/shop';
const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
});

//set handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs'); 
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(varMiddleware);

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        // const candidate = await User.findOne();
        // if(!candidate) {
        //     const user = new User({
        //         email: 'imshpit@gmail.com',
        //         name: 'Nastya',
        //         cart: {items: []}
        //     });
        //     await user.save();
        // }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();