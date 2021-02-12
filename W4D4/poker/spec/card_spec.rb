require "card"

describe Card do
  

  describe "#initialize" do
    # before(:each) do
    let(:suites){[:diamond, :heart, :club, :spade]}
    # end 
    it "should receive a number value" do
      expect{Card.new(suites.sample, 2)}.to_not raise_error #(ArgumentError)
    end

    it "should receive a number value between 2 and 14" do
      expect{Card.new(suites.sample, 0)}.to raise_error #(RangeError)
    end

    it "should receive a suite value" do
      expect{Card.new(suites.sample, 2)}.to_not raise_error #(ArgumentError)
    end

    it "should only receive a designate suite value" do
      expect{Card.new("red", 2)}.to raise_error
    end
  end
end