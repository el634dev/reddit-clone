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
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).lean()
            .then((post) => {
                if (!post) {
                    return res.status(404).send('Post not found');
                }
                res.render('posts-show', { post });
            })
            .catch((err) => {
                console.log(err.message);
                res.status(500).send('Internal Server Error');
            });
      });

    // CREATE
    app.post('/posts/new', (req, res) => {
        // Instantiate a new instance of POST model
        const post = new Post(req.body);

        // Save instance of POST model to DB and redirect to the post
        post.save()
            .then(() => res.redirect('/'))
            .catch((err) => {
                console.log(err.message);
                res.status(500).send('Internal Server Error');
            });
    });
};
