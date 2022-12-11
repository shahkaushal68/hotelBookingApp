import jwt from "jsonwebtoken";

export const validToken = (req, res, next) => {
  const token = req.cookies.access_cookie;
  if (!token) return res.status(500).json("You are not authnicated!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, function (err, decoded) {
    if (err) return res.status(403).json("Invaid Token");
    req.user = decoded;
    next();
  });
};

export const verifyTokenAndUser = (req, res, next) => {
  validToken(req, res, () => {
    //console.log("req.user", req.user);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allow");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  validToken(req, res, () => {
    //console.log("req.user", req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Only Admin can allow!");
    }
  });
};
