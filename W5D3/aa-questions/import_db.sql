DROP TABLE IF EXISTS question_tags;
DROP TABLE IF EXISTS question_follows;
DROP TABLE IF EXISTS question_likes;
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;

PRAGMA foreign_keys = ON;  -- turn on the foreign key constraints to ensure data integrity

-- USERS


CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  f_name VARCHAR(255) NOT NULL,
  l_name VARCHAR(255) NOT NULL
);

INSERT INTO
  users (f_name, l_name)
VALUES
  ("Ned", "Ruggeri"), ("Kush", "Patel"), ("Earl", "Cat"), ("Donald", "Trump"), ("Joe", "Biden");


-- QUESTIONS


CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO
  questions (title, body, user_id)
SELECT
  "Ned Question", "NED NED NED", 1
FROM
  users
WHERE
  users.f_name = "Ned" AND users.l_name = "Ruggeri";

INSERT INTO
  questions (title, body, user_id)
SELECT
  "Kush Question", "KUSH KUSH KUSH", users.id
FROM
  users
WHERE
  users.f_name = "Kush" AND users.l_name = "Patel";

INSERT INTO
  questions (title, body, user_id)
SELECT
  "Earl Question", "MEOW MEOW MEOW", users.id
FROM
  users
WHERE
  users.f_name = "Earl" AND users.l_name = "Cat";

INSERT INTO
  questions (title, body, user_id)
SELECT
  "Kush Question 2", "No one likes this one.", users.id
FROM
  users
WHERE
  users.f_name = "Kush" AND users.l_name = "Patel";

-- QUESTION_FOLLOWS

CREATE TABLE question_follows (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO
  question_follows (user_id, question_id)
VALUES
  ((SELECT id FROM users WHERE f_name = "Ned" AND l_name = "Ruggeri"),
  (SELECT id FROM questions WHERE title = "Earl Question")),

  ((SELECT id FROM users WHERE f_name = "Kush" AND l_name = "Patel"),
  (SELECT id FROM questions WHERE title = "Earl Question")
);


-- REPLIES


CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  parent_reply_id INTEGER,
  user_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (parent_reply_id) REFERENCES replies(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO
  replies (question_id, parent_reply_id, user_id, body)
VALUES
  ((SELECT id FROM questions WHERE title = "Earl Question"),
  NULL,
  (SELECT id FROM users WHERE f_name = "Ned" AND l_name = "Ruggeri"),
  "Did you say NOW NOW NOW?"
);

INSERT INTO
  replies (question_id, parent_reply_id, user_id, body)
VALUES
  ((SELECT id FROM questions WHERE title = "Earl Question"),
  (SELECT id FROM replies WHERE body = "Did you say NOW NOW NOW?"),
  (SELECT id FROM users WHERE f_name = "Kush" AND l_name = "Patel"),
  "I think he said MEOW MEOW MEOW."
);


-- QUESTION_LIKES


CREATE TABLE question_likes (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(question_id) REFERENCES questions(id)
);

-- INSERT INTO
--   question_likes (user_id, question_id)
-- VALUES
--   ((SELECT id FROM users WHERE f_name = "Kush" AND l_name = "Patel"),
--   (SELECT id FROM questions WHERE title = "Earl Question")
-- );

-- and here is the lazy way to add some seed data:
INSERT INTO
  question_likes (user_id, question_id) 
VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 2),
  (2, 3),
  (3, 2);


-- TAGS


CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO tags (name) VALUES ("Ruby");
INSERT INTO tags (name) VALUES ("Javascript");
INSERT INTO tags (name) VALUES ("CSS");
INSERT INTO tags (name) VALUES ("HTML");


CREATE TABLE question_tags (
  id INTEGER PRIMARY KEY,
  question_id INTEGER,
  tag_id INTEGER
);

-- more lazy data seeding
INSERT INTO question_tags (question_id, tag_id) VALUES (1, 1);
INSERT INTO question_tags (question_id, tag_id) VALUES (1, 2);
INSERT INTO question_tags (question_id, tag_id) VALUES (1, 3);
INSERT INTO question_tags (question_id, tag_id) VALUES (1, 4);
INSERT INTO question_tags (question_id, tag_id) VALUES (2, 3);
INSERT INTO question_tags (question_id, tag_id) VALUES (2, 4);
