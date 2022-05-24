const router = require("express").Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ],
        order: [['created_at', 'DESC']],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbPostData => {
             
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn:req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;