class Card
  SUITES = [:diamond, :heart, :club, :spade]

  def initialize(suite, number)
    @suite = suite
    @number = number

    raise "error" unless SUITES.include?(suite) && number.between?(2, 14)
  end

  def value
    @suite.to_s + number.to_s
  end
  
end