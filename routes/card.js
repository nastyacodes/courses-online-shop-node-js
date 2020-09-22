const {Router} = require('express');
const { route } = require('./add');
const router = Router();
const Card = require('../models/card');
const Course = require('../models/course');

router.post('/add', async () => {
    const course = await Course.getById(req.body.id);
    await Card.addCourse(course);
    res.redirect('/card');
});

router.get('/', async (req, res) => {
    const card = await Card.fetch();
    res.render('card', {
        title: 'Корзина',
        card
    });
});

module.exports = router;