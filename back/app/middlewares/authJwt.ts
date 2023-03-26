import { SecretPassJwt } from "../config/auth.config";
const jwt = require("jsonwebtoken");

export const middleware = (req: any, res: any, next: () => void) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        success: false,
        data: null,
        message: "No token provided!"
      });
    }
    jwt.verify(token, SecretPassJwt, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({
          success: false,
          data: null,
          message: "Acceso no autorizado!"
        });
      }
  
      res.locals['id'] = decoded['id'];
      res.locals['email'] = decoded['email'];
      res.locals['default_lang'] = decoded['default_lang'];
      next();
    });
    next()
  }
  