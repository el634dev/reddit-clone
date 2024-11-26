const Post = require('../models/post');

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
    
    // Look Up The Post
    app.get('/posts/:id', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).lean();

            if (!post) {
                return res.status(404).send('Post not found')
            }
            return res.render('posts-show', { post })
        } catch (err) {
            console.log(err.message);
        };
    })

    // CREATE
    app.post('/posts/new', (req, res) => {
        // Instantiate a new instance of POST model
        const post = new Post(req.body);

        // Save instance of POST model to DB and redirect to the post
        post.save(() => res.redirect('/'));
    });
};
