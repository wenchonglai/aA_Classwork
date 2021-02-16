class Node
  attr_reader :key
  attr_accessor :val, :next, :prev
  
  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end

  def remove
    # optional but useful, connects previous link to next link
    # and removes self from list.
  end
end

class LinkedList

  include Enumerable
  
  def initialize
    @head = Node.new
    @tail = Node.new

    @head.next = @tail
    @head.prev = @tail
    @tail.next = @head
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    return nil if empty?
    @head.next
  end

  def last
    return nil if empty?
    @tail.prev
  end

  def empty?
    @head.next == @tail && @tail.prev == @head
  end

  def get(key)
    node = self.find{|node| node.key == key}
    node.val if node
  end

  def include?(key)
    self.any?{|node| node.key == key}
  end

  def append(key, val)
    new_node = Node.new(key, val)
    penultimate = @tail.prev

    penultimate.next = new_node
    @tail.prev = new_node
    new_node.next = @tail
    new_node.prev = penultimate
  end

  def update(key, val)
    node = get_node(key) 
    node.val = val if node
  end

  def remove(key)
    node = get_node(key)
    node.prev.next = node.next
    node.next.prev = node.prev
    node.prev = nil
    node.next = nil
  end

  def each(&prc)
    curr_node = @head.next
    
    until curr_node == @tail
      prc.call(curr_node)
      curr_node = curr_node.next
    end

    self
  end

  # uncomment when you have `each` working and `Enumerable` included
  # def to_s
  #   inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  # end
  alias_method :delete, :remove #replacing the remove method in LinkedList with the delete method in p01

  private
  def get_node(key)
    self.find{|node| node.key == key}
  end
end

