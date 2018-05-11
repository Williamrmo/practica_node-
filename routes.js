var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("app/home.html")
});

router.get("/", function (req, res) {
    res.render("app/shop.html");
});

module.exports = router;