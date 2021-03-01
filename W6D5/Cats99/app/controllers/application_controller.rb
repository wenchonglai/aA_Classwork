class ApplicationController < ActionController::Base
  def initialize(*args)
    @cat_count = Cat.count
    super()
  end
end
