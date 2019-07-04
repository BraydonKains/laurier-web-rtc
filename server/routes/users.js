var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require("../controllers/user_controller.js");

router.use(
    bodyParser.urlencoded({
	extended: true,
    })
);
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
    let u = controller.index();
    res.send(u);
});

/* GET user by id */
router.get("/:id", function(req, res, next) {
    controller.show(req.params.id);
});

/* POST to create user */
router.post("/create", function(req, res, next) {
    var user = req.body.username;
    res.send(user);
});

/* PATCH to update user */
router.patch("/update", function(req, res, next) {
    controller.update(req.body);
});

/* POST to delete user */
router.post("/create", function(req, res, next) {
    controller.destroy(req.body);
});

module.exports = router;
