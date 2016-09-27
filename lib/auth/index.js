const { PORT, CLIENT_SECRET, CLIENT_ID } = process.env;
const app = require('express')();
const request = require('request');

app.get('/auth/slack/callback', function (req, res) {
  let form = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code
  };

  request.post('https://slack.com/api/oauth.access', { form: form }, function(err, response, body) {
    console.log(body);
  });
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`)
});
