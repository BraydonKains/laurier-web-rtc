var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require("../controllers/user_controller.js");
var passport = require('passport');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let u = await controller.index();
    res.send(u);
});

/* GET user by id */
router.get("/:id", async function(req, res, next) {
    let u = await controller.show(req.params.id) 
    res.send(u);
});

/* POST to create user */
router.post("/create", async function(req, res, next) {
    let user = req.body;
    let result = await controller.create(user);
    res.send(result);
});

/* PATCH to update user */
router.patch("/update", async function(req, res, next) {
    console.log(req.body);
    let result = await controller.update(req.body);
    res.send(result);
});

/* POST to delete user */
router.post("/delete/:id", async function(req, res, next) {
    let result = await controller.destroy(req.params.id);
    res.send(result);
});

router.post("/login", passport.authenticate('local'), function(req, res) {
    res.sendStatus(200);
});

module.exports = router;
