require 'erb'

class ShowExceptions
  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    @app.call(env)
  rescue => e
    render_exception(e)
  end

  private

  def render_exception(e)
    return ['500', {'Content-type' => 'text/html'}, ['RuntimeError']]
    res.finish
  end

end
