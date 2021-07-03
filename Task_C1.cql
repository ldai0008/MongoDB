/*
  Name       :LU DAI
  Unitcode   :FIT5137
  Student Id :30759277
*/

//////////////////////////
//        C1        //
//////////////////////////

//5. Create a keyspace called FIT5137A1_MRDB for the Cassandra database, with SimpleStrategy and replication factor of 1.
CREATE KEYSPACE FIT5137A1_MRDB with replication =  
{'class':'SimpleStrategy','replication_factor':1}; 

//6. Create the following column families using appropriate data types :
//a. user_ratings
CREATE TYPE user_personal_traits ( 
birth_year int, 
weight int, 
height float, 
marital_status text 
); 
 
CREATE TYPE user_personality ( 
interest text,  
type_of_worker text,  
fav_color text,  
drink_level text);  
 
CREATE TYPE  user_preferences ( 
Budget text,  
Smoker boolean,  
dress_preference text,  
ambience text,  
transport text); 
 
CREATE TYPE user_other_demographics( 
religion text,  
employment text); 
 
CREATE TABLE user_ratings( 
rating_id int, 
user_id int, 
place_id int, 
rating_place float, 
rating_food float, 
rating_service float, 
user_personal_traits frozen<user_personal_traits>, 
user_personality frozen<user_personality>, 
user_preferences frozen< user_preferences >, 
user_other_demographics frozen<user_other_demographics>, 
user_fav_cuisines set<text>, 
user_fav_payment_method set<text>, 
PRIMARY KEY(rating_id, user_id)); 

//b. place_ratings
CREATE TYPE place_address( 
street text,  
city text,  
state text,  
country text); 
 
CREATE TYPE place_features( 
alcohol text,  
smoking_area text,  
dress_code text,  
accessibility text,  
price text,  
franchise text,  
area text,  
other_services text); 
 
CREATE TABLE place_ratings( 
rating_id int, 
user_id int, 
place_id int, 
rating_place float, 
rating_food float, 
rating_service float, 
place_name text, 
place_address frozen<place_address>, 
place_features frozen<place_features>, 
parking_arrangements text, 
accepted set<text>, 
cuisines set<text>, 
PRIMARY KEY(rating_id, user_id)); 

//7. Using the cassandra COPY command import the following data into the tables:
//a. user_ratings.csv into the user_ratings table.
COPY user_ratings (
rating_id, user_id, place_id, rating_place, rating_food, rating_service, user_personal_traits, user_personality, 
user_preferences, user_other_demographics, user_fav_cuisines, user_fav_payment_method) 
FROM 'C:\Users\Yao Wang\OneDrive - Monash University\Lecture\FIT5137\MonashMRDB_datasets\user_ratings.csv';

//b. place_ratings.csv into the place_ratings table.
COPY place_ratings (
rating_id,user_id,place_id,rating_place,rating_food,rating_service,
place_name,place_address,place_features,parking_arrangements,
accepted,cuisines) 
FROM 'C:\Users\Yao Wang\OneDrive - Monash University\Lecture\FIT5137\MonashMRDB_datasets\place_ratings.csv'; 
