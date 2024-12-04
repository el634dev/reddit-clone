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
    app.post('/posts/new', async (req, res) => {
        try {
            // INSTANTIATE INSTANCE OF POST MODEL
            const post = new Post(req.body);
        
            // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
            await post.save()
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    });

    // CREATE Comment
    app.post('/posts/:postId/comments', async (req, res) => {
        try {
            // INSTANTIATE INSTANCE OF MODEL
            const comment = new Comment(req.body);
            
            // SAVE INSTANCE OF Comment MODEL TO DB
            await comment.save()
            const post = Post.findById(req.params.postId);

            post.comments.unshift(comment);
            await post.save()
            res.redirect('/')
        } catch (err) {
            console.log(err);
        }
    });
    

    // Look Up The Post
    app.get('/post/:postId', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).lean()
            res.render('posts-show', { post })
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Problem with the server');
        };
    });

    // Subreddit
    app.get('/n/:subreddit', async (req, res) => {
        try {
            const posts = await Post.findById(req.params.id).lean().populate('comments')
            res.render('post-show', { posts })
        } catch (err) {
            console.log(err.message);
        };
    });
};
