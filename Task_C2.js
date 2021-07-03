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
//        C2        //
//////////////////////////

//1. MonR has gained some new information about a trendy new place. Therefore, without creating any new fields , insert all of the information provided in Table 1.
db.placeProfiles.insertOne(
{
    "_id": 70000,
    "acceptedPaymentModes": ["any"],
    "address": {
        "city": "San Luis Potosi",
        "country": "Mexico",
        "state": "SLP",
        "street": "Carretera Central Sn"
    },
    "cuisines": ["Mexican","Burgers"],
    "parkingArragements": "none",
    "placeFeatures": {
        "accessibility": "completely",
        "alcohol": "No_Alcohol_Served",
        "area": "open",
        "dressCode": "informal",
        "franchise": true,
        "otherServices": "Internet",
        "price": "medium",
        "smokingArea": "not permitted"
    },
    "placeName": "Taco Jacks",
    "openingHours": [{
        "hours": "09:00-20:00",
        "days": ["Mon", "Tue", "Wed", "Thu", "Fri"]
    }, {
        "hours": "12:00-18:00",
        "days": ["Sat"]
    }, {
        "hours": "12:00-18:00",
        "days": ["Sun"]
    }]
})

//2. They have also realised that the user with user_id 1108, no longer prefers Fast_Food
//and also prefers to pay using debit_cards instead of cash. Therefore, without looking
//up the existing values or adding any new fields, update user 1108’s favorite
//cuisines and favorite payment methods.

db.userProfiles.updateOne({"_id":1108},{"$pull":{"favCuisines":"Fast_Food"}}) 
db.userProfiles.updateOne({"_id":1108},{"$pull":{"favPaymentMethod":"cash"}}) 
db.userProfiles.updateOne({"_id":1108},{"$push":{"favPaymentMethod":"debit_card"}})

//3. The management has realised that the user with user_id 1063 was an error. Therefore delete the user 1063 from the database.
db.userProfiles.deleteOne({_id:1063})





