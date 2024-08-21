const jwt = require('jsonwebtoken'); // import using cjs

const auth = (req, res, next) => {
  console.log("AUTH MIDDLEWARE");
  console.log("req.cookies:",req.cookies);
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
  console.log("TOKEN:",token);
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
