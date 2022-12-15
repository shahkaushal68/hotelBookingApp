import jwt from "jsonwebtoken";

export const validToken = (req, res, next) => {
  let token = req.header("Authorization");

  if (token?.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
    if (token) {
      jwt.verify(token, process.env.JWT_SECRETE_KEY, function (err, decoded) {
        if (err) return res.status(401).json("Token is Invalid");
        if (decoded) {
          //console.log(decoded);
          req.user = decoded;
          next();
        }
      });
    }
  } else {
    return res.status(401).json("You are not authnticated");
  }
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
