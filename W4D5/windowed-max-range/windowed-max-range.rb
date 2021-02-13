require "benchmark"

def windowed_max_range(array, window_size)  #O(m * n)
  curr_max_range = nil
  len = array.length
  sub_arr = []
  new_arr = []
  # (window_size...len).each do |i|
  #   sub_arr = arr[i - window_size...i]
  (0...len).each do |i|                     
    next if i + window_size > len
    sub_arr << array.slice(i, window_size)#[i...i + window_size]   
  end

  sub_arr.each do |ele|                     
    max = ele.max
    min = ele.min
    range = max - min
    new_arr << range
  end

  new_arr.max                               
end

class DQueueNode
  attr_reader :val, :next, :prev

  def initialize(val)
    @val = val
    @next = nil
    @prev = nil
  end
  def append(node)
    node.prev = self
    self.next = node   
  end

  protected
  attr_writer :next, :prev
end

class DQueue
  def initialize
    @head = DQueueNode.new(nil)
    @tail = DQueueNode.new(nil)
    @head.append(@tail)
    @length = 0
  end

  def empty?
    @length.zero?
  end

  def <<(val)
    node = DQueueNode.new(val)
    @tail.prev.append(node)
    node.append(@tail)
    @length += 1
  end

  def pop
    return nil if @tail.prev == @head
    prev = @tail.prev
    prev.prev.append(@tail)
    @length -= 1
    prev.val
  end

  def shift
    return nil if @head.next == @tail
    next_node = @head.next
    @head.append(next_node.next)
    @length -= 1
    next_node.val
  end
  
  def first
    @head.next.val
  end

  def last
    @tail.prev.val
  end
end

def get_sub_arr_significant_value(arr, size, &prc)  #O(n)
  d_q = []#DQueue.new # may as well assign d_q to []; time complexity will still be O(n)

  arr.map.with_index do |el, i| #each el gets pushed and popped/shifted only once
    d_q.pop until d_q.empty? || prc.call(d_q.last[0], el) && d_q.last[1] > i - size
    d_q.shift unless d_q.empty? || d_q.first[1] > i - size
    d_q << [el, i]
    d_q.first[0]
  end
end

def windowed_max_range_v2(array, window_size)
  maxs = get_sub_arr_significant_value(array, window_size){|a, b| a >= b}
  mins = get_sub_arr_significant_value(array, window_size){|a, b| a <= b}

  (window_size - 1...array.length).inject(0) do |acc, i|
    diff = maxs[i] - mins[i]
    acc = diff > acc ? diff : acc
  end
end

if __FILE__ == $PROGRAM_NAME
  p windowed_max_range_v2([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
  p windowed_max_range_v2([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
  p windowed_max_range_v2([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
  p windowed_max_range_v2([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8

  arr = Array.new(1e5){rand(-1e6..1e6)}

  Benchmark.bm do |b|
    b.report("O(n) solution"){windowed_max_range_v2(arr, 2000)}
    b.report("O(n^2) solution"){windowed_max_range(arr, 2000)}
  end
end