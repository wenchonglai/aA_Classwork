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

    it "should accept a number of disks from the user" do

    end
  end

  describe "#move" do
    it "should allow a player to stack a disk on a peg" do

    end

    it "should continue to allow moves until the game is won" do

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