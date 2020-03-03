const shoppingList_model = require('../models/shoppingList-model');
const shoppingList_views = require('../views/shoppingList-views');


const get_shoppingLists = (req, res, next) => {
    const user = req.user;
    user.populate('shoppingLists')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                shoppingLists: user.shoppingLists
            };
            let html = shoppingList_views.shoppingLists_view(data);
            res.send(html);
        });
};

const post_delete_shoppingList = (req, res, next) => {
    const user = req.user;
    const shoppingList_id_to_delete = req.body.shoppingList_id;

    //Remove shoppingList from user.shoppingLists
    const updated_shoppingLists = user.shoppingLists.filter((shoppingList_id) => {
        return shoppingList_id != shoppingList_id_to_delete;
    });
    user.shoppingLists = updated_shoppingLists;

    //Remove shoppingList object from database
    user.save().then(() => {
        shoppingList_model.findByIdAndRemove(shoppingList_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_shoppingList = (req, res, next) => {
    const shoppingList_id = req.params.id;
    shoppingList_model.findOne({
        _id: shoppingList_id
    }).then((shoppingList) => {
        let data = {
            text: shoppingList.text
        };
        let html = shoppingList_views.shoppingList_view(data);
        res.send(html);
    });
};


const post_shoppingList = (req, res, next) => {
    const user = req.user;
    let new_shoppingList = shoppingList_model({
        text: req.body.shoppingList
    });
    new_shoppingList.save().then(() => {
        console.log('shoppingList saved');
        user.shoppingLists.push(new_shoppingList);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_shoppingLists = get_shoppingLists;
module.exports.get_shoppingList = get_shoppingList;
module.exports.post_shoppingList = post_shoppingList;
module.exports.post_delete_shoppingList = post_delete_shoppingList;