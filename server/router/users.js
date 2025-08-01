export default (router) => {
  router.get("/login", (req, res, next) => {
    res.send("Login");
  });
};
