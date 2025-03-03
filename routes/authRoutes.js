const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const countriesController = require("../controllers/countriesController");
const checkAuthenticate = require("../middlewares/checkAuthenticate");
const countryformController = require("../controllers/countryformController");
const blogController = require("../controllers/blogController");
const uploadImages = require("../middlewares/uploadImages");

router.post("/api/register", authController.register);
router.post("/api/login", authController.login);
router.get("/api/dashboard", checkAuthenticate, authController.getDashboard);
router.post("/api/logout", checkAuthenticate, authController.logout);

router.get("/api/getsingleblog/:id", blogController.getSingleblog);
router.post("/api/addblog", blogController.createblog);
router.get("/api/getallblogs", blogController.getAllBlogs);
router.put("/api/updateblog/:id", blogController.updateblog);
router.delete("/api/deleteblog/:id", blogController.deleteblog);
router.post("/api/likeblog/:id", blogController.likeblog);

router.post("/api/insertCountry", countriesController.insertCountry);
router.put("/api/updateCountry/:id", countriesController.updateCountry);
router.delete("/api/deleteCountry/:id", countriesController.deleteCountry);
router.get("/api/getAllCountries", countriesController.getAllCountries);

router.post("/api/addcountryform", countryformController.createCountryform);
router.get(
  "/api/getSingleCountryform",
  countryformController.getSingleCountryform
);
router.put(
  "/api/updatecountryform/:id",
  countryformController.updateCountryform
);
router.delete(
  "/api/deletecountryform/:id",
  countryformController.deleteCountryform
);

module.exports = router;
