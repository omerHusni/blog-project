const key = process.env.COOKIE_KEY;

const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keygrip = new Keygrip([JSON.stringify(key)]);

module.exports = (user) => {
  const sessionObject = {
    passport: {
      user: user._id.toString(),
    },
  };
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

  const sig = keygrip.sign('session=' + session);

  return { session, sig };
};
