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
    user_data = QuestionsDatabase.instance.execute(<<-SQL, f_name, l_name)
      SELECT
        *
      FROM
        users
      WHERE
        f_name = ? OR l_name = ?
    SQL

    user_data.map{|datum| User.new(datum)}
  end

  def initialize(options)
    @id = options['id']
    @f_name = options['f_name']
    @l_name = options['l_name']
  end

  def authored_questions
    Question.find_by_author_id(@id)
  end

  def authored_replies
    Reply.find_by_user_id(@id)
  end


end

class Question
  attr_accessor :id, :title, :body, :user_id
  def self.find_by_id(id)
    QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        questions
      WHERE
        id = ?
    SQL
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
  
  def initialize(options)
    @id = options['id']
    @title = options['title']
    @body = options['body']
    @user_id = options['user_id']
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

  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
    @parent_id = options['parent_id']
    @body = options['body']
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

class Like
  attr_accessor :id, :user_id, :question_id
  def self.find_by_id(id)
    QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        likes
      WHERE
        id = ?
    SQL
  end
  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end
end