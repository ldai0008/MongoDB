/*
  Name       :LU DAI
  Unitcode   :FIT5137
  Student Id :30759277
*/

//////////////////////////
//        C2        //
//////////////////////////

//4. To be consistent with the changes made in Task C.2 (1), (2), and (3), the management
//has also requested to update the reviews information to reflect the changes made to
//the users 1108 and remove the user 1063’s reviews. They have looked up the data in
//the reviews table and have provided the information in table 2.

create index on user_ratings(user_id);
delete from user_ratings where rating_id in (137,138,139,140,141); 
delete from place_ratings where rating_id in (137,138,139,140,141); 

// delete Fast_Food, prefer to using debit_cards instead of cash 
update user_ratings 
	set user_fav_cuisines = user_fav_cuisines - {'Fast_Food'} 
	where rating_id in (65,66,67,68,69,70,71,72,73,74) and user_id = 1108;

update user_ratings 
	set user_fav_payment_method = user_fav_payment_method - {'cash'} 
	where rating_id in (65,66,67,68,69,70,71,72,73,74) and user_id = 1108;

update user_ratings 
	set user_fav_payment_method = user_fav_payment_method + {'debit_cards'} 
	where rating_id in (65,66,67,68,69,70,71,72,73,74) and user_id = 1108;

//5. It was also seen that user 1060 has reviewed Taco Jacks (ie. the new place with place
//id 70000), therefore using the information from table 3, insert the following data: (for
//this insert only you may look up the details of user 1060).
insert into place_ratings(
	rating_id, user_id, place_id, rating_place, rating_food, rating_service)
 	values (7777, 1060, 70000, 2, 1, 2);
select * from place_ratings where rating_id = 7777;




