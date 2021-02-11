requrie "game"

describe Game do

  describe "#initialize" do
    it "should accept a number indicating the number the disk" do
      expect{Game.new(6)}.to_not raise_error(ArgumentError)
    end

    it "should not accept an argument other than a number" do
      expect{Game.new('a')}.to raise_error(ArgumentError)
    end
    
    it "should generate three pegs" do
      expect(Game.new)
    end
  end

  subject(:game) {Game.new(6)}

  describe "#move" do
    double(:player, :get_input => [0, 1]) 
    it "should recieve a player input" do
      expect{game.move(player.get_input)}.to_not raise_error(ArgumentError)
    end

    it "should correctly move the disc to the designated peg" do
      expect(game.pegs).to eq([[], [1,2,3,4,5,6], []])
      game.move(player.get_input)
    end 

    it "should "
  end

  describe "#play" do 
    it "should continue to allow moves until the game is won" do
      expect(game).to receive(:play)

    end
  end


  describe "#won?" do
    it "should check if two of the pegs are empty" do

    end

    it "should print 'you won' when the game is complete" do

    end
  end

  describe "#valid_move?" do

  end
end