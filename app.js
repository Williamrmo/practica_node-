var express = require("express");
var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");
var cons = require('consolidate');

var router_app = require("./routes.js");
var User = require("./models/user.js").User;
var session_middleware = require("./middleware/session.js");

var app = express();

app.use('/public', express.static('public'));
app.use(bodyParser.json()); // Para peticiones JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name: "session.js",
    keys: ["llave-1", "llave-2"]
}));

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/',function(req,res){
    console.log(req.session.user_id);
    res.render('index');
});

app.get('/signup.html', function (req, res) {
    User.find(function (err, doc) {
        console.log(doc);
        res.render('signup.html');
    })
});

app.get('/login.html', function (req, res) {
    res.render('login.html');
});

app.post("/users", function (req, res) {

    var user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });
    // promesas
    user.save().then(function (err, user) {
        res.redirect('/app');
    }, function (err) {
        if (err) {
            console.log(String(err));
            res.send("No pudimos guardar la informacion");
        }
    });

});

app.post("/sessions.js", function (req, res) {

    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        req.session.user_id = user._id;
        res.redirect("/app")
    });

});

app.get("/"), function (req, res) {
    req.redirect("/shop.html")
}

app.use("/app", session_middleware);
app.use("/app", router_app);

app.listen(8080);