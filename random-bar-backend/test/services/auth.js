// app middleware function used to restrict certain areas of site

let AuthService = {};

AuthService.restrict = (req, res, next) => {
  // header is meta data sent along with certain requests
  // checks for header
  if(req.headers['authorization']) {
    const payload = jwt.verify(req.headers['authorization'], 'keyboard cat');
    if (payload) {
      req.user = payload;
      next();
    } else {
      res
      .status(401)
      .json({ error: 'Token is not valid'});
    }
  } else {
    res
    .status(401)
    .json({ error: 'Please provide an authenticated token'});
  }
}

module.exports = AuthService;
