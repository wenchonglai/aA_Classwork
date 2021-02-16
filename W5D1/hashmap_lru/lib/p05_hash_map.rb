require_relative 'p04_linked_list'
require_relative 'p03_hash_set'

class HashMap < HashSet
  attr_accessor :count

  # def initialize(num_buckets = 8)
  #   @store = Array.new(num_buckets) { LinkedList.new }
  #   @count = 0
  # end

  # def include?(key)

  # end

  def set(key, val)
    bucket = self[key]
    if bucket.include?(key)
      bucket.update(key, value)
    else
      bucket.append(key, value)
    end
  end

  def get(key)
    bucket = self[key]
    bucket.get(key) if bucket
  end

  def delete(key)
    bucket = self[key]
  end

  def each
    
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

  end

  def bucket(key)
    # optional but useful; return the bucket corresponding to `key`
  end
end
