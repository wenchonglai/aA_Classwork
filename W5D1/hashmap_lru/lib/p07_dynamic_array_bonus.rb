class StaticArray
  attr_reader :store

  def initialize(capacity)
    @store = Array.new(capacity)
  end

  def [](i)
    validate!(i)
    self.store[i]
  end

  def []=(i, val)
    validate!(i)
    self.store[i] = val
  end

  def length
    self.store.length
  end

  private

  def validate!(i)
    raise "Overflow error" unless i.between?(0, self.store.length - 1)
  end
end

class DynamicArray
  include Enumerable

  attr_accessor :count

  def initialize(capacity = 8)
    @store = StaticArray.new(capacity)
    @count = 0
    @capacity = capacity
  end

  def [](i)
    return nil if i >= @count || i < -@count
    i += @count if i < 0
    @store[i]
  end

  def []=(i, val)
    resize! if i >= @capacity

    i += @count if i < 0
    @count = i + 1 if i > @count

    @store[i] = val
  end

  def capacity
    @store.length
  end

  def include?(val)
    each{|el| return true if el == val}
    false
  end

  def push(val)
    resize! if @count == @capacity

    @store[@count] = val
    @count += 1
  end

  def unshift(val)
    resize! if @count == @capacity - 1

    (0...@count).reverse_each {|i| @store[i + 1] = @store[i]}
    @store[0] = val
    @count += 1
  end

  def pop
    return nil if @count.zero?

    val = @store[@count - 1]
    @store[@count - 1] = nil
    @count -= 1
    val
  end

  def shift
    return nil if @count.zero?

    val = @store[0]
    (1...@count).each{|i| @store[i - 1] = @store[i] }
    @store[@count - 1] = nil
    @count -= 1
    val
  end

  def first
    @store[0]
  end

  def last
    @store[@count - 1]
  end

  def each(&prc)
    (0...@count).each {|i| prc.call(@store[i])}
  end


  def to_s
    "[" + inject([]) { |acc, el| acc << el }.join(", ") + "]"
  end

  def ==(other)
    return false unless [Array, DynamicArray].include?(other.class)
    return false unless self.length == other.length

    each_with_index {|el, i| return false if el != other[i]}

    true
  end



  alias_method :<<, :push
  [:length, :size].each { |method| alias_method method, :count }

  private

  def resize!
    @capacity *= 2
    new_store = StaticArray.new(@capacity)

    (0...@count).each{|i| new_store[i] = @store[i]}

    @store = new_store
  end
end
