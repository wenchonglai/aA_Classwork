require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    # ...

    @columns ||= (
      DBConnection.execute2(<<-SQL)
      select
        *
      from
        #{self.table_name}
      SQL
    ).first.map(&:to_sym)
  end

  def self.finalize!
    @finalized = false

    return if @finalized

    self.columns.each do |column_name|
      define_method(column_name) do 
        self.attributes[column_name]
      end

      define_method("#{column_name}=") do |val|
        self.attributes[column_name] = val
      end
    end

    @finalized = true
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name || self.name.downcase.pluralize
  end

  def self.all
    self.parse_all( DBConnection.execute(<<-SQL)
        select * from #{self.table_name}
      SQL
    )

  end

  def self.parse_all(results)
    results.map{|datum| self.new(datum)}
  end

  def self.find(id)
    self.parse_all( DBConnection.execute(<<-SQL, id)
        select *
        from #{self.table_name}
        where id = ?
      SQL
    ).first
  end

  def method_missing(method_name, *args)
    if method_name[-1] == '='
      raise "unknown attribute '#{method_name[0...-1]}'"
    end
  end

  def initialize(params = {})
    # ...
    self.class.finalize!

    params.each do |key, val|
      self.send("#{key}=", val)
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map do |column_name|
      self.send(column_name)
    end
  end

  def insert
    begin
      raise "#{self} already exists!" if self.id

      DBConnection.execute(<<-SQL, *self.attribute_values)
        insert into
        #{self.class.table_name}(#{self.class.columns.join(', ')})
        values
        (#{Array.new(self.class.columns.length, '?').join(', ')})
      SQL

      self.id = DBConnection.last_insert_row_id
    rescue 
    end
  end

  def update
    raise "#{self} does not exist!" unless self.id
    
    DBConnection.execute(<<-SQL, *self.attribute_values, id)
      update #{self.class.table_name}
      set
      #{self.class.columns.map.with_index{|col, i| "#{col} = ?"}.join(', ')}
      where id = ?
    SQL
  end

  def save
    if self.id
      self.update
    else
      self.insert
    end
  end
end
