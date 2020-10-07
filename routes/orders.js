const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
    res.render('orders', {
        isOrder: true,
        title: 'Заказы'
    });
});

router.post('/', async (req, res) => {
    res.redirect('/orders');
})

module.exports = router;