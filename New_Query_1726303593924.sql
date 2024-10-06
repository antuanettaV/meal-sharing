-- Active: 1724583087510@@127.0.0.1@3306@test
--Meal
SELECT * FROM meal;

INSERT INTO meal (id, title, description, location, `when`, max_reservations, price, created_date)
VALUES ('Meal Title', 'Meal description', 'Kiev', '2024-09-20 18:00:00', 50, 29.99, NOW());

SELECT * FROM meal WHERE id = 1;

UPDATE meal 
SET title = 'Delicious Meal Title' 
WHERE id = 1;

UPDATE meal 
SET title = 'New Meal Title', price = 32.00 
WHERE id = 1;

DELETE FROM meal WHERE id = 1;

--Reservation
SELECT * FROM reservation;

INSERT INTO reservation (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email)
VALUES (4, 1, NOW(), '1234567890', 'Hanna V', 'hannav@gmail.com');

SELECT * FROM reservation WHERE id = 1;

UPDATE reservation 
SET number_of_guests = 10 
WHERE id = 1;

UPDATE reservation 
SET number_of_guests = 7, contact_phonenumber = '10987654321' 
WHERE id = 1;


DELETE FROM reservation WHERE id = 1;

--Review
SELECT * FROM review;

INSERT INTO review (title, description, meal_id, stars, created_date)
VALUES ('Fantastic Meal', 'The food was amazing and very tasty', 4, 5, '2024-09-14 13:00:00');

SELECT * FROM review WHERE id = 1;

UPDATE review
SET title = 'amazing meal'
WHERE id = 1;

UPDATE review
SET created_date = '2024-09-20 14:00:00', title = 'new review'
WHERE id = 2;

DELETE FROM review WHERE id = 1;

-- Add different meal
INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date)
VALUES ('Paella', 'An authentic paella', 'Spain', '2024-09-25 14:00:00', 30, 50, NOW()); 

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date)
VALUES ('Dumplings', 'Dumplings with potatoes and mushrooms', 'Ukraine', '2023-10-20 12:00:00', 20, 30, NOW());

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date)
VALUES ('Rød Grød med Fløde', 'Traditional Danish dessert with cream', 'Copenhagen', '2024-09-30 20:00:00', 15, 10.00, NOW());

-- Add different reservations
INSERT INTO reservation (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email)
VALUES (8, 2, NOW(), '389988700', 'Yeva V', 'yevav@gmail.com');

INSERT INTO reservation (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email)
VALUES (7, 3, NOW(), '8675432190', 'Ivan V', 'ivanv@gmail.com');

INSERT INTO reservation (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email)
VALUES (3, 5, NOW(), '9988776655', 'Peter Parker', 'peter@example.com');

--Add different reviews
INSERT INTO review (title, description, meal_id, stars, created_date)
VALUES ('Very Tasty and Healthy', 'I was really impressed', 4, 5, NOW());

INSERT INTO review (title, description, meal_id, stars, created_date)
VALUES ('Fresh and Fast', 'Great food, was prepared very quickly', 6, 3, NOW());

INSERT INTO review (title, description, meal_id, stars, created_date)
VALUES ('Amazing', 'Exceeded all expectations', 5, 5, NOW());

--Get meals that has a price smaller than a specific price fx 90
SELECT * FROM meal WHERE price < 90;

--Get meals that still has available reservations
SELECT * FROM meal 
WHERE id IN (
    SELECT meal_id 
    FROM reservation 
    GROUP BY meal_id 
    HAVING SUM(number_of_guests) < (SELECT max_reservations FROM meal WHERE id = meal_id)
);

--Get meals that partially match a title
SELECT * FROM meal WHERE title LIKE '%Rød grød med%';

--Get meals that has been created between two dates
SELECT * FROM meal WHERE created_date BETWEEN '2024-09-01' AND '2024-09-30';

--Get only specific number of meals fx return only 5 meals
SELECT * FROM meal LIMIT 5;

--Get the meals that have good reviews
SELECT meal.*
FROM meal
JOIN review ON meal.id = review.meal_id
GROUP BY meal.id
HAVING AVG(review.stars) >= 4;

--Get reservations for a specific meal sorted by created_date
SELECT * FROM reservation WHERE meal_id = 1 ORDER BY created_date ASC;

--Sort all meals by average number of stars in the reviews
SELECT meal.*
FROM meal
JOIN review ON meal.id = review.meal_id
GROUP BY meal.id
ORDER BY AVG(review.stars) DESC;
