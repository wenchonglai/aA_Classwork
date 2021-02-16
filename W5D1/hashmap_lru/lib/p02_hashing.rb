
class Integer
  # Integer#hash already implemented for you
  #int hashes are 19 digits
end

class Array
  def hash
    seed = 8594035890285093285
    (0...self.length).inject(seed) { |acc, i| acc ^ self[i].hash + i.hash }
  end
end

class String
  def hash
    seed = 8349089044595492333
    return seed if self.empty?
    (0...self.length).inject(seed) { |acc, i| acc ^ self[i].ord.hash + i.hash }
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    seed = 8593058904385903
    (0...self.size).inject(seed) {|acc, i| acc ^ (self.keys[i].hash + self.values[i].hash)}
  end
end
