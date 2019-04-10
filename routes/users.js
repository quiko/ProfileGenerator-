const router = require("express-promise-router")();
const usersController = require("../controllers/users");
const { validateBody, schemas } = require("../helpers/routeHelper");
const passport = require("passport");
require("../passport-setup");

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), usersController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    usersController.signIn
  );

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersController.secret
  );

module.exports = router;
