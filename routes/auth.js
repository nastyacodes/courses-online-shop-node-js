const {Router} = require('express');
const User = require('../models/user');
const router = Router();

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    });
});

router.get('/logout', async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
});

router.post('/login', async (req, res) => {
    const user = await User.findById("5f7a503fb2476643d8766a6c");
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(err => {
        if(err) {
            throw err;
        }
        res.redirect('/');
    });
});

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.redirect('/auth/login#register');
        } else {
            const user = new User({
                email, name, password, cart: {items: []}
            });

            await user.save();
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;