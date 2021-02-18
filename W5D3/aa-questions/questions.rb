require "sqlite3"
require "singleton"

class QuestionsDatabase < SQLite3::Database 
  include Singleton

  def initialize
    super('questions.db')
    self.type_translation = true
    self.results_as_hash = true
  end
end

def execute(string, *args)
  QuestionsDatabase.instance.execute(string, *args)
end

def instantiate(string, *args, className)
  result_data = execute(string, *args);

  result_data.map{|datum| className.new(datum)}
end

class User
  attr_accessor :id, :f_name, :l_name

  def self.find_by_id(id)
    user_data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        users
      WHERE
        id = ?
    SQL

    user_data.map{|datum| User.new(datum)}.first
  end

  def self.find_by_name(f_name, l_name)
    user_data = instantiate(<<-SQL, f_name, l_name, User)
      SELECT
        *
      FROM
        users
      WHERE
        f_name = ? OR l_name = ?
    SQL
      .first
  end

  def self.all
    instantiate(<<-SQL, User)
      SELECT
        *
      FROM
        users
    SQL
  end

  def initialize(options)
    @id = options['id']
    @f_name = options['f_name']
    @l_name = options['l_name']
  end

  def save
    raise "#{self} exists" if @id

    QuestionsDatabase.instance.execute(<<-SQL, @f_name, @l_name)
      INSERT INTO
        users(f_name, l_name)
      VALUES
        (?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end

  def authored_questions
    Question.find_by_author_id(@id)
  end

  def authored_replies
    Reply.find_by_user_id(@id)
  end

  def followed_questions
    QuestionFollow.followed_questions_for_user_id(@id)
  end

  def average_karma
    QuestionsDatabase.instance.execute(<<-SQL, @id)
      SELECT
        COUNT(question_likes.id) / ( COUNT(DISTINCT questions.id) + 0.0 )as avg_likes
      FROM
        questions LEFT JOIN question_likes ON questions.id = question_likes.question_id
      WHERE
        questions.user_id = ?
      GROUP BY
        questions.user_id
        
      
    SQL
  end
end

class Question
  attr_accessor :id, :title, :body, :user_id
  def self.find_by_id(id)
    instantiate(<<-SQL, id, Question)
      SELECT
        *
      FROM
        questions
      WHERE
        id = ?
    SQL
      .first
  end

  def self.find_by_author_id(author_id)
    instantiate(<<-SQL, author_id, Question)
      SELECT
        *
      FROM
        questions
      WHERE
        user_id = ?
    SQL
  end

  def self.most_followed(n)
    QuestionFollow.most_followed_questions(n)
  end

  def self.most_liked(n)
    QuestionLike.most_liked_questions(n)
  end

  def self.all
    instantiate(<<-SQL, Question)
      SELECT
        *
      FROM
        questions
    SQL
  end
  
  def initialize(options)
    @id = options['id']
    @title = options['title']
    @body = options['body']
    @user_id = options['user_id']
  end

  def save
    raise "#{self} exists" if @id

    QuestionsDatabase.instance.execute(<<-SQL, @title, @body, @user_id)
      INSERT INTO
        questions(title, body, user_id)
      VALUES
        (?, ?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end

  def author
    instantiate(<<-SQL, user_id, User)
      SELECT
        *
      FROM
        users
      WHERE
        id = ?
    SQL
  end

  def replies
    Reply.find_by_question_id(@id)
  end

  def followers
    QuestionFollow.followers_for_question_id(@id)
  end

  def likers
    QuestionLike.likers_for_question_id(@id)
  end

  def num_likes
    QuestionLike.num_likes_for_question_id(@id)
  end

  
end

class QuestionFollow
  attr_accessor :id, :user_id, :question_id
  def self.find_by_id(id)
    instantiate(<<-SQL, id, QuestionFollow)
      SELECT
        *
      FROM
        question_follows
      WHERE
        id = ?
    SQL
  end

  def self.followers_for_question_id(question_id)
    instantiate(<<-SQL, question_id, User)
      SELECT
        users.*
      FROM
        users JOIN questions ON users.id = questions.user_id
      WHERE
        questions.id = ?
    SQL
  end
  
  def self.followed_questions_for_user_id(user_id)
    instantiate(<<-SQL, user_id, Question)
      SELECT
        questions.*
      FROM
        users JOIN questions ON users.id = questions.user_id
      WHERE
        user_id = ?
    SQL
  end

  def self.most_followed_questions(n)
    instantiate(<<-SQL, n, Question)
      SELECT
        questions.*
      FROM
        question_follows JOIN questions ON questions.id = question_follows.question_id
      GROUP BY
        questions.id
      ORDER BY
        COUNT(*) DESC
        LIMIT ?
    SQL
  end
  
  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end
  
end

class Reply
  attr_accessor :id, :user_id, :question_id, :parent_id, :body
  def self.find_by_id(id)
    instantiate(<<-SQL, id, Reply)
      SELECT
        *
      FROM
        replies
      WHERE
        id = ?
    SQL
  end

  def self.find_by_user_id(user_id)
    instantiate(<<-SQL, user_id, Reply)
      SELECT
        *
      FROM
        replies
      WHERE
        user_id = ?
    SQL
  end

   def self.find_by_question_id(question_id)
    instantiate(<<-SQL, question_id, Reply)
      SELECT
        *
      FROM
        replies
      WHERE
        question_id = ?
    SQL
  end

  def self.all
    instantiate(<<-SQL, Reply)
      SELECT
        *
      FROM
        replies
    SQL
  end

  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
    @parent_id = options['parent_id']
    @body = options['body']
  end

  def save
    raise "#{self} exists" if @id

    QuestionsDatabase.instance.execute(<<-SQL, @user_id, @question_id, @parent_id, @body)
      INSERT INTO
        questions(user_id, question_id, parent_id, body)
      VALUES
        (?, ?, ?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end

  def author
    instantiate(<<-SQL, user_id, User)
      SELECT
        *
      FROM
        users
      WHERE
        id = ?
    SQL
  end

  def question
    instantiate(<<-SQL, question_id, Question)
      SELECT
        *
      FROM
        questions
      WHERE
        id = ?
    SQL
  end

  def parent_reply
    instantiate(<<-SQL, parent_id, Reply)
      SELECT
        *
      FROM
        replies
      WHERE
        id = ?
    SQL
  end

  def child_reply
    instantiate(<<-SQL, parent_id, Reply)
      SELECT
        *
      FROM
        replies
      WHERE
        parent_id IN (
          SELECT
            parent_id
          FROM
            replies 
        )
    SQL
  end
end

class QuestionLike
  attr_accessor :id, :user_id, :question_id
  def self.find_by_id(id)
    instantiate(<<-SQL, id, QuestionLike)
      SELECT
        *
      FROM
        question_likes
      WHERE
        id = ?
    SQL
  end

  def self.likers_for_question_id(question_id)
    instantiate(<<-SQL, question_id, QuestionLike)
      SELECT
        DISTINCT users.*
      FROM
        users 
      JOIN 
        question_likes ON users.id = question_likes.user_id
      WHERE
        question_likes.question_id = ?
    SQL
  end

  def self.num_likes_for_question_id(question_id)
    QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        COUNT(users.id) 
      FROM
        users 
      JOIN 
        question_likes ON users.id = question_likes.user_id
      WHERE
        question_likes.question_id = ?
    SQL
      .length
  end

  def self.liked_questions_for_user_id(user_id)
    instantiate(<<-SQL, user_id, Question)
      SELECT
        questions.*
      FROM
        questions JOIN question_likes on questions.id = question_likes.question_id
      WHERE
        question_likes.user_id = ?
    SQL
  end

  def self.most_liked_questions(n)
    instantiate(<<-SQL, n, Question)
      SELECT
        *
      FROM
        questions JOIN question_likes on questions.id = question_likes.question_id
      GROUP BY
        questions.id
      ORDER BY
        COUNT(*) DESC
      LIMIT ?
    SQL
  end

  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end
end

