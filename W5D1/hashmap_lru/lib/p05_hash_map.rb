require_relative 'p04_linked_list'
require_relative 'p03_hash_set'

class HashMap < HashSet
  include Enumerable

  @@BucketClass = LinkedList

  attr_accessor :count

  # def initialize(num_buckets = 8)
  #   @store = Array.new(num_buckets) { LinkedList.new }
  #   @count = 0
  # end

  def include?(key)
    bkt = bucket(key)
    return false unless bkt && bkt.include?(key)
    true
  end

  def set(key, val)
    resize! if @num_buckets < @count + 1

    bkt = bucket(key)

    if bkt.include?(key)
      bkt.update(key, val)
    else
      bkt.append(key, val)
      @count += 1
    end
  end

  def get(key)
    bkt = bucket(key)
    bkt.get(key) if bkt
  end

  def delete(key)
    bkt = bucket(key)

    if bkt
      @count -= 1 if bkt.include?(key)
      bkt.delete(key) 
    end
  end

  def each(&prc)
    @store.each do |bucket|
      bucket.each do |node|
        prc.call(node.key, node.val)
      end
    end
  end

  # uncomment when you have Enumerable included
  # def to_s
  #   pairs = inject([]) do |strs, (k, v)|
  #     strs << "#{k.to_s} => #{v.to_s}"
  #   end
  #   "{\n" + pairs.join(",\n") + "\n}"
  # end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    @store.length
  end

  def resize!
    @num_buckets *= 2
    #new_arr = Array.new(@num_buckets){[]}
    flattened_arr = []
    new_arr = Array.new(@num_buckets){@@BucketClass.new}
  
    @store.each do |bucket|
      bucket.each do |node|
        flattened_arr << node
      end
    end

    flattened_arr.each do |node|
      new_arr[node.key.hash % @num_buckets] << node
    end
    
    @store = new_arr
  end

  def bucket(key)
    @store[key.hash % num_buckets]
  end
end
