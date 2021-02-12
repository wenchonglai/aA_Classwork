require "deck"

describe "Deck" do
  subject(:deck) { Deck.new()}
  double("card", :value => "spade5")
  describe "#initialize" do 
    it "should have a count of 0" do 
      expect(deck.count).to be(0) 
    end
  end

  describe "#push" do 
    it "should take a poker instance and add to the cards" do 
      expect(deck.push(card)).to_not raise_error
    end

    it "should correctly incriment the deck count" do 
      deck.push(card)
      expect(deck.count).to be(1)
    end

    it "should not double count duplicated cards" do 
      double("card1", :value => "spade5")
      deck.push(card)
      deck.push(card1)
      expect(deck.count).to be(1)
    end
  end

  describe "#pop" do 
    it "should pop the first card from the deck stack and return it" do
      deck.push(card)
      expect(deck.pop).to be(card)
    end

    it "should return nil if the deck is empty" do 
      expect(deck.pop).to be(nil)
    end
  end

  describe "#shuffle" do
    expect(deck.cards).to receive(shuffle)
    card.shuffle
    
  end

end