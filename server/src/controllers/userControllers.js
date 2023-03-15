const { User } = require('../../db/models');

const { decodeToken } = require('./lib/jwt');

exports.getUser = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id } = decoded;
  
  try {
    const user = await User.findOne({ where: { id }, attributes: ['login', 'email'] });
    console.log('1111111', user);
    res.json(user);
  } catch (error) {
    res.json({ fail: 'fail' });
  }
};
