class MaxIntSet
  attr_reader :store

  def initialize(max)
    @max = max
    
    #max + 1 so we can return "false" in our include method
    #@store = Array.new(max + 1) {false}

    #alternative:
    @store = Array.new(max) {false}

  end

  def insert(num)
    @store[num] = true if is_valid?(num)
  end

  def remove(num)
    @store[num] = false if is_valid?(num)
  end

  def include?(num)
    #return @store[num]
    
    #alternative:
    return @store[num] || false #takes advantage of nil is falsy
  end

  private

  def is_valid?(num)
    raise "Out of bounds" unless num.between?(0,@max)
    true
  end

  def validate!(num)

  end
end


class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    self[num] << num
  end

  def remove(num)
    self[num].delete(num)
  end

  def include?(num)
    # @store[num % num_buckets].include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    @store[num % num_buckets]
  end

  def num_buckets
    @store.length
  end
end

require "byebug"

class ResizingIntSet < IntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    super
    @count = 0
    @num_buckets = num_buckets
  end

  def insert(num)
    resize! if @num_buckets < @count + 1

    super unless self.include?(num)

    count += 1
  end
  
  def remove(num)
  end
  
  def include?(num)
    
  end
  
  def to_a
    
  end
  
  def inspect
    
  end
  
  protected
  
  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end
  
  def num_buckets
    @num_buckets
  end
  
  def resize!
    # debugger
    @num_buckets *= 2
    new_arr = Array.new(@num_buckets){[]}
  
    @store
      .flatten(1)
      .each do |ele|
        new_arr[ele % @num_buckets] << ele
      end
    
    @store = new_arr
  end
end
