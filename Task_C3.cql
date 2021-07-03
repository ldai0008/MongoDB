/*
  Name       :LU DAI
  Unitcode   :FIT5137
  Student Id :30759277
*/

//////////////////////////
//        C3        //
//////////////////////////

//3. How many reviews were made in the database?
select count(*) from user_ratings;

select count(*) from place_ratings;

//4. How many reviews were created by places having public parking arrangements?
create index on place_ratings(parking_arrangements);
select count(*) from place_ratings where parking_arrangements = 'public';

//5. Display the user id, rating of places and the user’s personality for all users who are interested in technology, thrifty protector types of workers, with blue as their favorite colour and are casual drinkers.
//(Note that the number of rows returned should be greater than zero)
create index idxPersonality on user_ratings(user_personality);
select user_id,rating_place,user_personality from user_ratings 
	where user_personality = {interest:'technology', type_of_worker:'thrifty-protector', fav_color:'blue', 
	drink_level:'casual drinker'};


//6. What are the place ids and ratings for food for places serving only Pizzeria cuisine?
//(Note the result should include cuisine).
create index index_cuisine on place_ratings( cuisines);
select place_id, rating_food, cuisines from place_ratings 
	where  cuisines contains 'Pizzeria';

//10. Display the average place rating, average food rating, and average service rating for puesto de tacos. Show the average values in decimal points.
create index index_place_name on place_ratings(place_name);

select AVG(rating_place) as avg_place_rating 
	from place_ratings 
	where place_name = 'puesto de tacos';

select AVG(rating_food) as avg_food_rating 
	from place_ratings 
	where place_name = 'puesto de tacos';

select AVG(rating_service) as avg_service_rating 
	from place_ratings 
	where place_name = 'puesto de tacos';

//12. For each user whose favourite cuisine is Family, display the place ID, the place rating, the food rating and the user’s budget.
create index idx_user_fav_cuisines on user_ratings(user_fav_cuisines);

select place_id, rating_place,rating_food, user_preferences.budget 
	from user_ratings 
	where user_fav_cuisines contains 'Family';

//17. List the place rating that the payment method could be ‘VISA’ and there are parking arrangements in the place.
create index park_idx on place_ratings (parking_arrangements);
create index pay_idx on place_ratings (accepted);
select * from place_ratings 
	where accepted contains 'VISA' 
	and parking_arrangements = 'yes' allow filtering;

//20. Calculate the number of place ratings for the restaurants which have Mexican cuisine.
create index idxCuisine on place_ratings(cuisines);
select sum (rating_place) 
	from place_ratings 
	where cuisines contains 'Mexican';











