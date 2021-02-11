require "game"

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
    it "should return true when the game is being played" do
      double(:player, :get_input => [0, 1]) 
      expect(game.move).to eq(true) if game.won? == false
    end

    it "should recieve a player input" do
      expect{game.move(player.get_input)}.to_not raise_error(ArgumentError)
    end

    it "should correctly move the disc to the designated peg" do
      expect(game.pegs).to eq([[2,3,4,5,6], [1], []])
      game.move(player.get_input)
    end 

    it "should continue to call #move until the game is won" do
      expect(game.move).to eq(true)
    end

    it "should call game.won? if the game is won" do
      expect(game.won?).to eq(true)
    end
  end

  describe "#play" do 
    it "should continue to allow moves until the game is won" do
      #game.play
      expect(game).to receive(:play)
    end
  end

  describe "#won?" do
    it "should one of the pegs reaches the maximum length" do
      expect(game.pegs[1..-1].any?{|peg| peg.length == 6})
    end
  end

  describe "#game_over" do
    it "should print 'you won' when the game is over" do
      expect(game.game_over).to output("you won").to_stdout
    end
  end

  describe "#valid_move?" do
    it "should accept a smaller disk to be placed on top of a larger disk" do
      
    end

    it "should raise an error if the disk being moved is larger than its destination" do

    end
  end

  # describe "#build_disk_stack" do
  #   it "should call #valid_move"
  #   it "should move the indicated disk to the indicated peg if the move is valid"
  #   it "should raise an error if the move is not valid"
  # end
end