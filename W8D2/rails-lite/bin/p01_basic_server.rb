require 'rack'

class ControllerBase
  def execute(req, res)
  end
end

wl_app = Proc.new do |env|
  req = Rack::Request.new(env)
  res = Rack::Response.new

  res['Content-Type'] = 'text/html'

  res.write(req.path)
  res.finish
end

Rack::Server.start({
  app: wl_app,
  Port: 3000
})