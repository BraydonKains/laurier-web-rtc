var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require("../controllers/user_controller.js");
var passport = require('passport');

/* GET users listing. */
router.get('/', isLoggedIn, async function(req, res, next) {
    let u = await controller.index();
    res.send(u);
});

/* GET user by id */
router.get("/:id", async function(req, res, next) {
    let u = await controller.show(req.params.id) 
    res.send(JSON.stringify(u));
});

/* POST to create user */
router.post("/create", async function(req, res, next) {
    let user = req.body;
    let result = await controller.create(user);
    res.send(JSON.stringify(result));
});

/* PATCH to update user */
router.patch("/update", async function(req, res, next) {
    console.log(req.body);
    let result = await controller.update(req.body);
    res.send(JSON.stringify(result));
});

/* POST to delete user */
router.post("/delete/:id", async function(req, res, next) {
    let result = await controller.destroy(req.params.id);
    res.send(JSON.stringify(result));
});

router.post("/login", passport.authenticate('local'), function(req, res) {
    res.sendStatus(JSON.stringify(200));
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
	return next();
    }

    res.status(400).json({
	'message': 'access denied'
    });
}
