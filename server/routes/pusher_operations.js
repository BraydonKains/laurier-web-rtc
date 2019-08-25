var express = require('express');
var router = express.Router();
var Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY, 
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true
});
    
/* GET home page. */
router.post('/message', function(req, res, next) {
    const payload = req.body;
    pusher.trigger('chat', 'message', payload);
    res.send(payload);
});

module.exports = router;
