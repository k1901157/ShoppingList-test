const product_model = require('../models/product-model');
const product_views = require('../views/product-views');

const get_product = (req, res, next) => {
    const shopping_list_id = req.params.id;
    shopping_list_model.findOne({
        _id: shopping_list_id
    }).then((shopping_list) => {
        let data = {
            text: shopping_list.text
        };
        let html = shoppingList_views.product_view(data);
        res.send(html);
    });
};

const post_product = (req, res, next) => {
    const user = req.user;
    let new_product = product_model({
        text: req.body.product
    });
    new_product.save().then(() => {
        console.log('product saved');
        user.products.push(new_product);
        user.save().then(() => {
            return res.redirect('/shopping_list/:id');
        });
    });
};

module.exports.get_product = get_product;
module.exports.post_product = post_product;
