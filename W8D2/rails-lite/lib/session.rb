require 'json'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    prev_cookies = req.cookies["_rails_lite_app"]
    @session = prev_cookies ? JSON.parse(prev_cookies) : {}
  end

  def [](key)
    @session[key]
  end

  def []=(key, val)
    @session[key] = val
  end

  # serialize the session into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    res.set_cookie("_rails_lite_app", {path: '/', value: @session.to_json})
  end
end
