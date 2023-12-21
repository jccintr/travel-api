const router = require('express').Router();
const placeController = require("../controllers/PlaceController");
const {verifyToken} = require('../middleware/jwt_token');



router.post('/',verifyToken,placeController.addPlace);
router.get('/',verifyToken,placeController.getPlaces);
router.get('/:id',verifyToken,placeController.getPlace);
router.get('/byCountry/:id',verifyToken,placeController.getPlacesByCountry);

module.exports = router;