-- DELETE FROM auth_user WHERE id IN(20, 21, 22, 23, 24)
-- SELECT * FROM users_profile WHERE profile_id IN(20, 21, 22, 23, 24);

-- DELETE FROM auth_user WHERE id IN(20, 21, 22, 23, 25)
-- SELECT * FROM auth_user

-- SELECT * FROM users_profile WHERE user_id IN(20, 26, 27, 28, 29, 30);
-- SELECT * FROM auth_user
-- SELECT * FROM auth_user
-- DELETE FROM auth_user WHERE id BETWEEN 20 AND 38;
-- DELETE FROM users_profile WHERE id IN(45, 46, 47)
-- DELETE FROM house_house
-- DELETE FROM auth_user WHERE id = 52
-- DELETE FROM house_room
-- DELETE FROM users_profile WHERE id BETWEEN 78 AND 150
-- DELETE FROM auth_user WHERE id BETWEEN 13 AND 208

-- SELECT * FROM users_profile

-- SELECT COUNT(id), interest_type_id FROM interest_interest GROUP BY interest_type_id ORDER BY COUNT(id) INNER JOIN interest_interesttype

-- DELETE FROM auth_user WHERE id BETWEEN 13 AND 708
-- SELECT * FROM users_profile
-- SELECT COUNT(id), interest_type_id FROM interest_interest GROUP BY interest_type_id ORDER BY COUNT(id)
-- SELECT * FROM AUTH_USER


-- DELETE FROM users_profile WHERE user_id BETWEEN 78 AND 500;
-- DELETE FROM auth_user WHERE id BETWEEN 13 AND 500;
-- DELETE FROM house_address;
-- DELETE FROM house_house;
-- DELETE FROM house_room;


-- SELECT COUNT(ii.id), ii.interest_type_id, it.name FROM interest_interest ii INNER JOIN interest_interesttype it ON ii.interest_type_id = it.id GROUP BY ii.interest_type_id ORDER BY COUNT(ii.id)

-- 
-- UPDATE interest_interest SET interest_type_id = 4 WHERE id IN (25, 26, 27, 30, 31, 32, 33, 34, 35)
-- DELETE interest_interesttype WHERE id IN (5, 6, 7)
-- SELECT it.name, it.id, ii.name, ii.id FROM interest_interest ii INNER JOIN interest_interesttype it ON ii.interest_type_id = it.id WHERE it.id IN (4, 6, 7) GROUP BY it.name, it.id, ii.name, ii.id ORDER BY it.name;
-- DELETE FROM interest_interesttype WHERE id IN (5, 6, 7)
-- SELECT COUNT(ii.id), ii.interest_type_id, it.name FROM interest_interest ii INNER JOIN interest_interesttype it ON ii.interest_type_id = it.id GROUP BY ii.interest_type_id ORDER BY COUNT(ii.id)
--
-- SELECT COUNT(ii.id), ii.interest_type_id, it.name FROM interest_interest ii INNER JOIN interest_interesttype it ON ii.interest_type_id = it.id GROUP BY ii.interest_type_id ORDER BY COUNT(ii.id)
-- DELETE FROM users_profile WHERE user_id BETWEEN 78 AND 500;
-- DELETE FROM auth_user WHERE id BETWEEN 13 AND 500;
-- DELETE FROM house_address;
-- DELETE FROM house_house;
-- DELETE FROM house_room;

-- SELECT * FROM interest_interesttype;

-- DELETE FROM users_profile WHERE user_id BETWEEN 78 AND 500;
-- DELETE FROM auth_user WHERE id BETWEEN 13 AND 500;
-- DELETE FROM house_address;
-- DELETE FROM house_house;
-- DELETE FROM house_room;
-- DELETE FROM users_profileinterests;
-- DELETE FROM interest_interest;
-- DELETE FROM interest_interesttype;

-- SELECT * FROM sqlite_sequence;

-- UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'interest_interesttype';
-- .mode csv;


-- UPDATE interest_interest SET description = ''
-- DELETE FROM users_profile WHERE user_id BETWEEN 78 AND 500;
-- DELETE FROM auth_user WHERE id BETWEEN 13 AND 500;

-- SELECT * FROM  interest_interest ORDER BY interest_type_id


-- DELETE FROM users_profile;
-- DELETE FROM auth_user;
-- DELETE FROM house_address;
-- DELETE FROM house_house;
-- DELETE FROM house_room;
-- DELETE FROM users_profileinterests;
-- DELETE FROM users_valuation;
DELETE FROM interest_interest;
DELETE FROM interest_interesttype;