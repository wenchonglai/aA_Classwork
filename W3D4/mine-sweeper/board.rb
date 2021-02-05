require_relative "grid.rb"

class Board
  def initialize(size = 9, bombs = size * size / 8)
    @size = size
    @grid = Array.new(@size){Array.new(@size){Grid.new(0)}}
    @bombs = []
    @revealed = 0
    @flagged = 0

    set_bomb(size, bombs)
  end
  
  def valid?(pos)
    pos.is_a?(Array) &&
      pos.length == 2 &&
      pos.map(&:to_i).all?{|i| i >= 0 && i < @size}
  end

  def [](pos) 
    raise "Invalid position" unless self.valid?(pos)
    x, y = pos
    @grid[y][x]
  end

  def flag(pos)
    self[pos].flag
  end

  def unflag(pos)
    self[pos].unflag
  end

  def win?
    @bombs.length + @revealed == @size ** 2
  end

  def lose?
    @bombs.length + @revealed > @size ** 2
  end

  def game_over?
    self.win? || self.lose?
  end

  def sweep(pos)
    if self[pos].bomb?
      self.reveal_all
      @revealed = @size ** 2
    else
      queue = [pos]

      until queue.empty?
        new_pos = queue.shift
        el = self[new_pos]
        el.reveal
        @revealed += 1

        self.each_surrounding_with_index(new_pos) do |adj_el, adj_pos|
          if el.blank? && !adj_el.revealed
            adj_el.reveal
            queue << adj_pos 
            
          end
        end
      end
    end
  end

  def render
    system "clear"
    @grid.each do |row|
      row.each do |grid|
        print grid.colorize
      end
      puts
    end
  end

  def reveal_all
    self.each_with_index do |el, _|
      el.reveal
    end
  end

  private
  def set_bomb(size, bombs)
    positions = (0...size).inject([]){|acc, j| acc + (0...size).map{|i| [j, i]}}
    positions.shuffle[0...bombs].each do |pos|
      @bombs << self[pos] = Grid.new('*')

      self.each_surrounding_with_index(pos) do |el, surr_pos|
        self[surr_pos] = Grid.new(el.val + 1) unless el.bomb?
      end
    end
  end

  protected
  def []=(pos, val) 
    raise "Invalid position" unless self.valid?(pos)
    x, y = pos
    @grid[y][x] = val
  end

  def each_with_index(&prc)
    (0...@size).each_with_index do |j|
      (0...@size).each_with_index do |i|
        prc.call(@grid[j][i], [j, i])
      end
    end
  end

  def each_surrounding_with_index(pos, &prc)
    raise "Invalid position" unless self.valid?(pos)

    x, y = pos

    (-1..1).each do |j|
      (-1..1).each do |i|
        new_pos = [ x + i, y + j ]
        prc.call(self[new_pos], new_pos) if self.valid?(new_pos)
      end
    end
  end
end

if __FILE__ == $PROGRAM_NAME
  r = Board.new

  r.sweep([0,0])
  r.render
end