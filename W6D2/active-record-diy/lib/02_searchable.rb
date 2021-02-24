require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    where_str = params.keys.map{|key| "#{key} = ?"}.join(' and ')

    self.parse_all(
      DBConnection.execute(<<-SQL, *params.values)
        select * from #{self.table_name}
        where #{where_str}
      SQL
    )
  end
end

class SQLObject
  # Mixin Searchable here...
  extend Searchable
end
