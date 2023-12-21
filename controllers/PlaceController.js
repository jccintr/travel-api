const Place = require('../models/Place');
const Country = require('../models/Country');
const jwt = require('jsonwebtoken');

module.exports = {

addPlace: async (req,res,next) => {
    const {country_id,description,imageUrl,location,title,rating,review,latitude,longitude} = req.body;

   try {

     const newPlace = new Place({country_id,description,imageUrl,location,title,rating,review,latitude,longitude});
     await newPlace.save();
     const country = await Country.findById(country_id);
     country.popular.push(newPlace._id);
     await country.save();
     
     res.status(201).json({status:true})

   } catch (error) {
      return next(error);
   }
   
},


getPlaces: async (req,res,next) => {

    try {

        const places = await Place.find({}, '_id review rating imageUrl, title, country_id');
        res.status(200).json(places);

    } catch (error) {
      return next(error);  
    }
   
},

getPlace: async (req,res,next) => {
   const placeId = req.params;

   try {

    const place = await Place.findById(placeId, {createdAt:0,updatedAt:0,__v:0});
        res.status(200).json(place);
    
   } catch (error) {
      return next(error);  
   }


},

getPlacesByCountry: async (req,res,next) => {
  const countryId = req.params;

  try {

   const place = await Place.findById(placeId, {createdAt:0,updatedAt:0,__v:0});
       res.status(200).json(place);
   
  } catch (error) {
     return next(error);  
  }


}





}