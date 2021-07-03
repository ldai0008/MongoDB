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
//        C3        //
//////////////////////////

//1. How many users are there in the database?
db.userProfiles.find().count()


//2. How many places are there in the database?
db.placeProfiles.find().count()


//7. Display all users who are students and prefer a medium budget restaurant.
//All the details of users in the table of useProfiles.
db.userProfiles.find({
	$and:[{"preferences.budget":"medium"},
	{"otherDemographics.employment":"student"}]
	}).pretty()

//8. Display all users who like Bakery cuisines and combine your output with all places having Bakery cuisines.
db.placeProfiles.aggregate([
	{$match:{cuisines:"Bakery"}},
	{$out:"bakery"}
	])

db.userProfiles.aggregate([
	{$match:{favCuisines:"Bakery"}}, 
	{$lookup:{
 	from:"bakery",
	 localField:"favCuisines",
 	foreignField:"cuisines",
 	as:"BakeryPlaces" }} 
	])


//9. Display International restaurants that are open on Sunday.
db.placeProfiles.find({"openingHours.days":"Sun"}).pretty()

//11. Display the average age according to each drinker level.
db.userProfiles.aggregate({
	$group: { _id:"$personality.drinkLevel", 
	"avgAge":{
	$avg:{
	$subtract:[2020,"$personalTraits.birthYear"]}
	}}})

//13. What are the top 3 most popular ambiences (friends/ family/ solitary) for a single when going to a Japanese restaurant?
db.userProfiles.aggregate([ 
	{$match:
	{$and:[{"personalTraits.maritalStatus":"single"},
	{favCuisines:"Japanese"}]}}, 
	{ $group: { _id:"$preferences.ambience", "count":{$sum:1} }}, 
	{ $sort: { "count":-1 }}, 
	{ $limit:3 } ])


//14. List the names of unique cuisines in the database.
db.placeProfiles.aggregate([
	{$unwind:"$cuisines"}, 
	{$group:{_id:"$cuisines"}}
	])

//15. Display all of the restaurants and indicate using a separate field/column whether the restaurant includes mexican cuisine. For instance, you can display if the restaurant serves mexican cuisine then the result should show the restaurant name followed by “serves mexican food” in the next field/column, or if the restaurant does not serves mexican cuisine then the result should show the restaurant name followed by “doesn’t serves mexican food” in the next field/column.
	db.placeProfiles.aggregate([ 
	{$project: { "placeName":1, "ifMexican": 
	{$cond: { if: 
	{$in:["Mexican","$cuisines"]}, 
	then:"serves mexican food", 
	else:"doesn't serves mexican food"}}}}
	])

//16.List all the users who were born after 1985, and their favourite cuisines contains Mexican.
db.userProfiles.createIndex( { "favCuisines": 1, "personalTraits.birthYear": 1 } )
db. userProfiles. find({ favCuisines: "Mexican", "personalTraits.birthYear": {$gt:1985 } }).pretty()


//18.Count the total number of all the types of parking arrangements in the Mexican restaurants which have no alcohol served.
db.placeProfiles.aggregate([ 
	{$match:
	{$and:[{"placeFeatures.alcohol":"No_Alcohol_Served"}, 
	{cuisines:"Mexican"}]}},
	{ $group: { _id:"$parkingArragements"  ,"count":{$sum:1}} } 
	])

//19.Calculate the total students in different budgets in different cuisines. 
db.userProfiles.aggregate([  
 	{ $unwind : "$favCuisines" },  
	{ $match : { "otherDemographics.employment" : "student" } }, 
	{ $group :  { _id : "$preferences.budget",sum:{$sum:1}}}
	 ])


