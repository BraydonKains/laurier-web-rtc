var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require("../controllers/room_controller.js");
var passport = require('passport');

/* GET rooms listing. */
router.get('/', async function(req, res, next) {
    let r = await controller.index();
    res.send(JSON.stringify(r));
});

/* GET rooms by id */
router.get("/:id", async function(req, res, next) {
    let r = await controller.show(req.params.id) 
    res.send(JSON.stringify(r));
});

/* POST to create room */
router.post("/create", async function(req, res, next) {
    let room = req.body;
    let result = await controller.create(room, req.body.user_id);
    res.send(JSON.stringify(result));
});

/* POST to subscribe to open room */
router.post("/subscribe", async function(req, res, next) {
    let result = await controller.subscribe(req.body.room_id, req.body.password);
    res.send(JSON.stringify(result));
});

/* POST to open/close a room */
router.post("/toggle_open", async function(req, res, next) {
    let result = await controller.toggle_open(req.body.user_id, req.body.room_id);
    res.send(JSON.stringify(result));
});

module.exports = router;
