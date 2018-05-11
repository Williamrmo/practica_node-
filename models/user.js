var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/final");

var emailMatch = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];

var passwordValidation = {
    validator: function (p) {
        return this.password_confimation === this.p;
    },
    message: "Las contraseñas no son igules"
};

var user_schema = new Schema({
    username: { type: String, required: true, maxlength: [10, "Username muy grande"] },
    password: { type: String, minlength: [6, "Password muy corto"], validate: passwordValidation },
    email: { type: String, required: "El coreo es obligatorio", match: emailMatch }
});

user_schema.virtual("password_confimation").get(function () {
    return this.p_c;
}).set(function (password) {
    this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;