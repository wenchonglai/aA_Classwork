require 'colorize'

class Grid
  COLORS = {
    "⚑" => { :color => :red, :background => :white, :mode => :blink },
    "1" => { :color => :light_blue, :background => :white, :mode => :bold },
    "2" => { :color => :green, :background => :white, :mode => :bold },
    "3" => { :color => :light_red, :background => :white, :mode => :bold },
    "4" => { :color => :blue, :background => :white, :mode => :bold },
    "5" => { :color => :magenta, :background => :white, :mode => :bold },
    "6" => { :color => :cyan, :background => :white, :mode => :bold },
    "7" => { :color => :yellow, :background => :white, :mode => :bold },
    "8" => { :color => :light_black, :background => :white, :mode => :bold },
    "*" => { :color => :black, :background => :white, :mode => :bold },
    "▉" => { :color => :light_black, :background => :white },
    " " => { :background => :white }
  }
  attr_reader :val, :revealed, :flagged
  def initialize(val)
    @val = val
    @revealed = false
    @flagged = false
  end

  def bomb?
    @val == '*'
  end
  
  def fringe?
    !self.bomb? && @val.positive
  end

  def blank?
    !self.bomb? && @val.zero?
  end

  def flag
    @flagged = true
  end

  def unflag
    @flagged = false
  end

  def reveal
    @revealed = true
  end

  def to_s
    return "⚑" if @flagged
    return "▉" unless @revealed
    return '*' if @val == '*'
    @val.positive? ? @val.to_s : ' '

  end

  def colorize
    ch = self.to_s

    (ch + (ch == "▉" ? "▉" : ' ')).colorize(COLORS[ch])
  end
end