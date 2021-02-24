require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def initialize(name, options = {})
    @method_name = name
    @primary_key = options[:primary_key] || "id".to_sym
  end

  def model_class
    @class_name.constantize
  end

  def table_name
    @class_name.downcase + 's'
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    super(name, options)

    @foreign_key = options[:foreign_key] || "#{name.to_s.singularize}_id".to_sym
    @class_name = options[:class_name] || name.to_s.camelcase
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    super(name, options)
    singular_form = name.to_s.singularize.downcase
    
    @foreign_key = options[:foreign_key] || "#{self_class_name.downcase.singularize}_id".to_sym
    @class_name = options[:class_name] || singular_form.camelcase
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    self.assoc_options[name] = BelongsToOptions.new(name, options)
    options = self.assoc_options[name]
    foreign_key = options.foreign_key

    define_method(name) do
      options.model_class.where(id: self.send(foreign_key)).first
    end
  end

  def has_many(name, options = {})
    options = HasManyOptions.new(name, self.name, options)
    foreign_key = options.foreign_key

    define_method(name) do
      where_hash = {}
      where_hash[foreign_key] = self.id

      options.model_class.where(where_hash)
    end
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
    @assoc_options ||= {}
  end
end

class SQLObject
  extend Associatable
  # Mixin Associatable here...
end
