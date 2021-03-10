require 'json'
require 'byebug'

class Flash

  def initialize(req)
    @req = req
    @flash = {}
    @cookie = JSON.parse(req.cookies["_rails_lite_app_flash"] || "{}")
    @now = {}
  end

  def [](key)
    @now[key.to_s] || @flash[key.to_s] || @cookie[key.to_s]
  end

  def []=(key, val)
    @flash[key.to_s] = val
  end

  def store_flash(res)
    res.set_cookie('_rails_lite_app_flash', {path: '/', value: @flash.to_json})
  end

  def now
    @now
  end
end
