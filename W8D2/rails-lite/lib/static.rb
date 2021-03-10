class Static
  def initialize(app)
    @app = app
  end
require 'byebug'
  def call(env)
    res = Rack::Request.new(env)
    match_data = /^(\/public\/.*)/.match(res.path)

    if match_data
      capture = match_data.captures.first
      begin
        content_type = Rack::Mime.mime_type(File.extname(capture))
        file = File::read(File.join(File.dirname(__FILE__), '..', capture))
        return [200, {"Content-type": content_type}, [file]]
      rescue => exception
        return [404, {}, []]
      end
    else
      @app.call(env)
    end
  end
end
