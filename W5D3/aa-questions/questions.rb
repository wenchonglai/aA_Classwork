require "sqlite3"
require "singleton"

class QuestionsDatabase < SQLite3::Database 
  include Singleton

  def initialize
    super('questions.db')
    type_translation = true
    results_as_hash = true
  end
end

def execute(string)
  QuestionsDatabase.instance.execute(string)
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

  def find_by_name(f_name, l_name)
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
  
  def initialize(options)
    @id = options['id']
    @title = options['title']
    @body = options['body']
    @user_id = options['user_id']
  end

end

class QuestionFollow
  attr_accessor :id, :user_id, :question_id
  def self.find_by_id(id)
    QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        question_follows
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

class Reply
  attr_accessor :id, :user_id, :question_id, :parent_id, :body
  def self.find_by_id(id)
    QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        replies
      WHERE
        id = ?
    SQL
  end

  def self.find_by_user_id(user_id)
    execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        replies
      WHERE
        user_id = ?
    SQL
  end

   def self.find_by_question_id(question_id)
    execute(<<-SQL, question_id)
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