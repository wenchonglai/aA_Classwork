require 'active_support'
require 'active_support/core_ext'
require 'active_support/inflector'
require 'erb'
require_relative './session'

class WLControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, params = {})
    @req = req
    @res = res
    @params = @req.params.merge(params)
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    raise "double rendering" if self.already_built_response?

    @already_built_response = true
    session.store_session(@res)
    res.status = 302
    res['Location'] = url
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise "double rendering" if self.already_built_response?

    @already_built_response = true
    session.store_session(@res)
    @res['Content-Type'] = content_type
    @res.write(content)
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    filename = File.join(
      File.dirname(__FILE__),
      "../views/#{controller_name}/#{template_name}.html.erb"
    )
    
    _content = File.read(filename)
    content = ERB.new(_content).result(binding)
    render_content(content, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end
require 'byebug'
  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    check_authenticity_token if @req.request_method != 'GET'

    self.send(name) unless already_built_response?
  end

  def form_authenticity_token
    @form_authenticity_token = @params['authenticity_token'] || ""
    @res.set_cookie('authenticity_token', {path: '/', value: @form_authenticity_token})
    @form_authenticity_token
  end

  def check_authenticity_token
    if @@protect_from_forgery

      raise "Invalid authenticity token" unless req.cookies['authenticity_token'] == self.form_authenticity_token
    end
  end

  def self::protect_from_forgery
    @@protect_from_forgery = true
  end

  private
  def controller_name
    self.class.name.underscore
  end
end

