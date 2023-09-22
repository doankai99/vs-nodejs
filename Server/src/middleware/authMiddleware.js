import Jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    const access_token = req.headers.token.split(' ')[0];
      console.log(access_token);
    Jwt.verify(access_token, 'access_token', function(err, user) {
      if (err) {
        return res.status(404).json({
          message: 'The user is not authenticated'
        });
      }
      if (user.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          message: "The user is not isAdmin"
        });
      }
    });
  };

export default authMiddleware
 