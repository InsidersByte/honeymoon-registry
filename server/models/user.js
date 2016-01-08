const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('../utilities/encryption');

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
});

UserSchema.pre('save', function preSave(next) {
    const self = this;

    // hash the password only if the password has been changed or user is new
    if (!self.isModified('password')) {
        return next();
    }

    self.salt = encryption.createSalt();
    self.password = encryption.hashPassword(self.salt, self.password);

    next();
});

UserSchema.methods.comparePassword = function comparePassword(password) {
    return encryption.hashPassword(this.salt, password) === this.password;
};

module.exports = mongoose.model('User', UserSchema);
