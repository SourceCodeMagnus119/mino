const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: "([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})",
        require: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 166,
        required: true,
    },
});
userSchema.pre("save", async(next) => {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);