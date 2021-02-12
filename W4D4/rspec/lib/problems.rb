class Array
  def my_uniq
    hash = Hash.new(0)

    self.each { |ele| hash[ele] += 1 }
    hash.keys
  end

  def two_sum
    arr = []

    length = self.length

    (0...length).each do |i|
      (i+ 1...length).each do |j|
       arr << [i, j] if self[i] + self[j] == 0
      end
    end

    arr
  end

end

def my_transpose(arr)
  raise ArgumentError.new unless arr.is_a?(Array) 
  return [] if arr.empty?
  
  length = arr.length
  width = arr[0].length

  transposed = Array.new(width) {Array.new(length)}

  (0...length).each do |row|
    (0...width).each do |col|
      transposed[col][row] = arr[row][col]
    end
  end

  transposed

end

def stock_picker(arr)

  start = 0
  destination = 1
  max = 0
  base = []

  while destination < arr.length
    start_value = arr[start]
    end_value = arr[destination]
    profit = end_value - start_value

    if profit > max
      base = [start, destination]
      max = profit
    end

    if end_value < start_value
      start = destination
    end

    destination += 1

  end

  base

end

