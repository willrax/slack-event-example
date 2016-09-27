const { PORT, TOKEN } = process.env;

const tinyspeck = require('tinyspeck');
const request = require('request');
const storage = require('./lib/storage');

const slack = tinyspeck.instance({ token: TOKEN });

slack.on('/coins', function({ response_url, user_id }) {
  let currentCount = storage.stars[user_id] || 0;

  let form = {
    response_type: 'ephemeral',
    text: `:coin: You currently have ${currentCount}`
  };

  request({
    url: response_url,
    method: 'POST',
    json: form
  });
});

slack.on('reaction_added', function({ event }) {
  let user = event.user;
  let poster = event.item_user;

  if (user === poster) { return; };

  let currentCount = storage.stars[user];

  if (currentCount === undefined) {
    storage.stars[poster] = 1;
  } else {
    storage.stars[poster] = currentCount + 1;
  }
});

slack.on('reaction_removed', function() {
  let user = event.user;
  let poster = event.item_user;

  if (user === poster) { return; };

  let currentCount = storage.stars[user];

  if (currentCount === undefined) {
    storage.stars[poster] = 0;
  } else if (currentCount === 1) {
    storage.stars[poster] = 0;
  } else {
    storage.stars[poster] = currentCount - 1;
  }
});

return slack.listen(PORT);
