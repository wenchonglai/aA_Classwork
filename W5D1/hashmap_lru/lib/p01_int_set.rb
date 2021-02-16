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
  @@BucketClass = Array #creating a class variable, class variable is an instance of the Array object (so, an array.) 

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { @@BucketClass.new }
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

class ResizingIntSet < IntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    super
    @count = 0
    @num_buckets = num_buckets
  end

  def insert(num)
    self.resize! if @num_buckets < @count + 1

    unless self.include?(num)
      super 
      @count += 1
    end
  end
  
  def remove(num)
    @count -= 1 if super
  end
  
  protected
  
  # def [](num)
  #   # optional but useful; return the bucket corresponding to `num`
  # end
  
  def num_buckets
    @num_buckets
  end
  
  def resize!
    # debugger
    @num_buckets *= 2
    #new_arr = Array.new(@num_buckets){[]}
    new_arr = Array.new(@num_buckets){@@BucketClass.new}
  
    @store
      .flatten(1)
      .each do |ele|
        new_arr[ele % @num_buckets] << ele
      end
    
    @store = new_arr
  end
end
