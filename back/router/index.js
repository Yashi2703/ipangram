const router = require("express").Router();
const beforeLogin =  require("../controllers/index");
const middleware = require("../Middleware/index")
router.post("/registration",beforeLogin.registration);
router.post("/login",beforeLogin.login);
router.post("/department",beforeLogin.department);
router.post("/assignDep",beforeLogin.assignDep);
router.get("/getDep",beforeLogin.getDep);
router.get("/getUser",beforeLogin.getUser);
router.get("/queryOne",beforeLogin.queryOne);
router.get("/queryTwo",beforeLogin.queryTwo);
router.get("/checkUser",beforeLogin.checkUserAssigndep);
module.exports = router
