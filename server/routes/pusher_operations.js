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

router.post("/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  var presenceData = {
	      user_id:
		Math.random()
		  .toString(36)
		  .slice(2) + Date.now()
	    };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

module.exports = router;
