require_relative '03_associatable'

# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options

  def has_one_through(name, through_name, source_name)
    through_options = @assoc_options
    define_method(name) do
      # p [name, self, through_name, through_options, source_name]
      intermediate = self.send(:human)

      self.send(through_name).send(source_name)

      # through_options.model_class.where(id: self.send(foreign_key)).first
    end
  end
end