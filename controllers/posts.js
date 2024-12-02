// controllers/posts.js
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {
    app.get('/', async (req, res) => {
        try {
            const posts = await Post.find({}).lean();
            return res.render('posts-index', { posts })
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Internal Server Error');
        };
    });
    
    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);
    
        // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
        post.save(() => res.redirect('/'));
    });

    // CREATE Comment
    app.post('/posts/:postId/comments', (req, res) => {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
    
        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
        .save()
        .then(() => Post.findById(req.params.postId))
        .then((post) => {
            post.comments.unshift(comment);
            return post.save();
        })
        .then(() => res.redirect('/'))
        .catch((err) => {
            console.log(err);
        });
    });

    // Look Up The Post
    app.get('/post/:postId', (req, res) => {
        Post.findById(req.params.id).lean()
          .then((post) => res.render('posts-show', { post }))
          .catch((err) => {
                console.log(err.message);
                res.status(500).send('Problem with the server');
          });
    });

    // Subreddit
    app.get('/n/:subreddit', async (req, res) => {
        try {
            const posts = await Post.findById(req.params.id).lean().populate('comments')
            return res.render('post-show', { posts })
        } catch (err) {
            console.log(err.message);
        };
    });
};
