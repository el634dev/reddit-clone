// controllers/comments.js --- below is the model
const Comment = require('../models/comment');

module.exports = (app) => {
    // CREATE Comment
    app.post('/posts/:postId/comments', async (req, res) => {
        try {
            // INSTANTIATE INSTANCE OF MODEL
            const comment = new Comment(req.body);
            comment.author = req.user._id;

            // SAVE INSTANCE OF Comment MODEL TO DB
            await comment.save()
            // REDIRECT TO THE ROOT
            res.redirect('/')
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    });
};