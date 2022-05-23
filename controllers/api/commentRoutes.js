const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!dbCommentData) {
            res.status(404).json({ message: 'Comment not found' });
        } else if (req.session.user_id === dbCommentData.user_id) {
            const dbDestroyData = await Comment.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json(dbDestroyData);
        } else {
            res.status(401).json({ message: 'You must be logged in to make these changes' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;