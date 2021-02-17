PRAGMA foreign_keys = ON;　

DROP TABLE IF EXISTS users; 

CREATE TABLE users(
  id INTEGER PRIMARY KEY,
  f_name TEXT,
  l_name TEXT
);

DROP TABLE IF EXISTS questions; 

CREATE TABLE questions(
  id INTEGER PRIMARY KEY,
  title TEXT,
  body TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) 
);

DROP TABLE IF EXISTS question_follows; 

CREATE TABLE question_follows( 
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  question_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES questions(id),
  FOREIGN KEY (question_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS replies; 

CREATE TABLE replies(
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  question_id INTEGER,
  parent_id INTEGER,
  body TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (parent_id) REFERENCES replies(id)

  -- reply TEXT REFERENCES questions(id)
  --   AND REFERENCES replies(id)
  --   AND REFERENCES users(id),
  -- subject_question NOT NULL REFERENCES questions(id)
);

DROP TABLE IF EXISTS question_likes;

CREATE TABLE question_likes(
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  question_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
  -- like BOOLEAN REFERENCES questions(id)
);