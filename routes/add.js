const Router = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

//fgyhijklghjkml,

router.post('/', async (req, res) => {
    
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user //Mongoose за нас добавит сюда только id
    });

    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
    
    
});

module.exports = router;