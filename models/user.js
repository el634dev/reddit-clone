const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, select: false },
}, { timestamps: true });

userSchema.pre('save', function(next) {
    // Encrypt
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (_, hash) => {
          user.password = hash;
          next();
        });
    });
});

// Use function to enable this.password
userSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = model('User', userSchema);