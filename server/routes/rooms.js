var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require("../controllers/room_controller.js");
var passport = require('passport');

/* GET rooms listing. */
router.get('/', async function(req, res, next) {
    let r = await controller.index();
    res.send(r);
});

/* GET rooms by id */
router.get("/:id", async function(req, res, next) {
    let r = await controller.show(req.params.id) 
    res.send(JSON.stringify(r));
});

/* POST to create room */
router.post("/create", async function(req, res, next) {
    let room = req.body;
    let result = await controller.create(room);
    res.send(JSON.stringify(result));
});

/* PATCH to update room */
router.patch("/update", async function(req, res, next) {
    console.log(req.body);
    let result = await controller.update(req.body);
    res.send(JSON.stringify(result));
});

/* POST to delete room */
router.post("/delete/:id", async function(req, res, next) {
    let result = await controller.destroy(req.params.id);
    res.send(JSON.stringify(result));
});

module.exports = router;
