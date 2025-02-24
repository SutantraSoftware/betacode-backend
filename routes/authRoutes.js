const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const countriesController = require('../controllers/countriesController');
const checkAuthenticate = require('../middlewares/checkAuthenticate');

const uploadImages = require('../middlewares/uploadImages');

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);

router.get('/api/dashboard', checkAuthenticate, authController.getDashboard);

router.post('/api/logout', checkAuthenticate, authController.logout);

router.post(
  '/api/insertCountry',
  uploadImages.single('image'),
  countriesController.insertCountry
);
router.put(
  '/api/updateCountry/:id',
  uploadImages.single('image'),
  countriesController.updateCountry
);

router.delete('/api/deleteCountry/:id', countriesController.deleteCountry);

router.get('/api/getAllCountries', countriesController.getAllCountries);

module.exports = router;
