const Post = require('../models/post');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('home');
    });
    
    app.get("/posts/new", (req, res) => {
        res.render("posts-new");
    });
    
    // CREATE
    app.post('/posts/new', (req, res) => {
        // Instantiate a new instance of POST model
        const post = new Post(req.body);

        // Save instance of POST model to DB and redirect to the post
        post.save(() => res.redirect('/'));
    });
<<<<<<< HEAD
};
=======
};
>>>>>>> f8d3c1b057d96ebfb276740e5cf4d5ae1e467830