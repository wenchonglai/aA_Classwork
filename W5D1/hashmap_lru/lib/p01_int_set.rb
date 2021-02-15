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
  end

  def remove(num)
  end

  def include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
  end

  def remove(num)
  end

  def include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end

  def resize!
  end
end
