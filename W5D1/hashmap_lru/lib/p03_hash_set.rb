require "p01_int_set"
require "p02_hashing"

class HashSet < ResizingIntSet
  attr_reader :count

  def initialize(num_buckets = 8)
    super
  end

  # def insert(key)
  # end

  # def include?(key)
  # end

  # def remove(key)
  # end

  private

  def [](val)
    val_hash = val.hash
    super(val_hash)
    # optional but useful; return the bucket corresponding to `num`
  end

  # def num_buckets
  #   @store.length
  # end

  def resize!
    new_arr = []
    @num_buckets = ?

    @store
      .flatten(1)
      .each {|ele| }
  end
end
