import { ErrorClass } from "../utils/error.util.js";
 
export const authorizationMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    // Get the loggedIn user from the request authUser from auth middleware
    const user = req.authUser;
    // Check if the allowed roles array includes the user role
    if (!allowedRoles.includes(user.role)) {
      return next(
        new ErrorClass(
          "Authorization Error",
          401,
          "You are not allowed to access this route"
        )
      );
    }
    next();
  };
};
