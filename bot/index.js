const { BOT_TOKEN } = process.env;

module.exports = {
  connect(slack) {
    let instance = slack.instance({ token: BOT_TOKEN });
    return instance.rtm();
  }
}
