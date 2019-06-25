var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require("../controllers/user_controller.js");

router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
	extended: true,
    })
);

/* GET users listing. */
router.get('/users', function(req, res, next) {
    controller.get();
});

/* GET user by id */
router.get("/users/:id", function(req, res, next) {
    controller.show(req.params.id);
});

/* POST to create user */
router.post("/users/create", function(req, res, next) {
    controller.create(req.body);
});

/* PATCH to update user */
router.patch("/users/update", function(req, res, next) {
    controller.update(req.body);
});

/* POST to delete user */
router.post("/users/create", function(req, res, next) {
    controller.destroy(req.body);
});

module.exports = router;
