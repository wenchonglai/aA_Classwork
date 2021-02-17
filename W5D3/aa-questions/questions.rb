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
end

# class User
#   def Self.find_by_id(id)
#     QuestionsDatabase.instance.execute(<<-SQL, id)
#       SELECT
#         *
#       FROM
#         users
#       WHERE
#         id = ?
#     SQL
#   end
#   def initialize(options)
#     @id = options['id']
#     @f_name = options['f_name']
#     @l_name = options['l_name']
#   end
# end