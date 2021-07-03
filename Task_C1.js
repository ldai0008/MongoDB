/*
  Name       :LU DAI
  Unitcode   :FIT5137
  Student Id :30759277
*/
/*
  Name       :Yao Wang 
  Unitcode   :FIT5137
  Student Id :26250659
*/
//////////////////////////
//        C1        //
//////////////////////////

//1. Using the Mongo Shell and appropriate Mongo Shell command(s), create a database called: FIT5137A1MRDB
use FIT5137A1MRDB

//2. Using the Mongo Shell and appropriate Mongo Shell command(s), create the following 2 collections: userProfiles， placeProfiles
db.createCollection("userProfiles")
db.createCollection("placeProfiles")

//3. Using MongoDB Compass and appropriate MongoDB Data Types, import the data in
//a. userProfile.json into the userProfiles collection.
db.userProfiles.aggregate([ 
	{$project:{_id:1, favCuisines:{$split:["$favCuisines",", "]},  
	favPaymentMethod: {$split: ["$favPaymentMethod",", "]},
	location:1, otherDemographics:1,
	personalTraits: 1, 
	personality:1, preferences:1, }},  
	{$out:"userProfiles"}])

//b. placeProfiles.json into the placeProfiles collection.
db.placeProfiles.aggregate([ 
	{$project:{_id:1,
	acceptedPaymentModes :{$split:["$acceptedPaymentModes",", "]},
	address:1, cuisines:{$split:["$cuisines",", "]},  
	location:1, parkingArragements:1, placeFeatures:1,
	placeName: 1}},  
	{$out:"placeProfiles"}
	])

//4. In MongoDB, we understand that there are two data modelling methods, which are embedding and referencing .
//b. Import the data in openingHours.csv into your FIT5137A1MRDB database using appropriate data models.
db.createCollection("openingHours")
db.openingHours.aggregate([ 
	{$project:{_id:1, placeID : 1, hours:{$split:["$hours",";"]},  
	days: {$split: ["$days",";"]}}},  {$out:"openingHours"}])

db.openingHours.update({}, {$pull: {hours: ""}} , {"multi": true})

db.openingHours.update({}, {$pull: {days: ""}} , {"multi": true})

db.placeProfiles.aggregate([
		{ $lookup:{from:"openingHours",
		localField:"_id",
		foreignField:"placeID",
		as: "openingHours"}},
		{$out: "placeProfiles"}])
db.placeProfiles.aggregate([
		{$unset:["openingHours: _id",
		"openingHours.placeID"]}, 
		{$out: "placeProfiles"}])
db.placeProfiles.aggregate([
		{$project:{ _id: 1,
		acceptedPaymentModes: 1, address:1, cuisines:1, location:1,
		parkingArragements:1, placeFeatures:1, placeName: 1,
		openingHours: {hours:1, days:1}}}, 
		{$out: "placeProfiles"}])

