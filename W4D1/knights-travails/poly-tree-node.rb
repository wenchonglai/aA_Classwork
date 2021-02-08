class PolyTreeNode
  
  attr_reader :value, :parent, :children
  
  def initialize(value)
    @parent = nil
    @children = []
    @value = value
  end

  def add_child(node)
    #return false if self.has_child?(node)
    #@children << node 
    node.parent = self 
  end

  def parent=(new_parent)
    @parent.children.delete(self) unless @parent.nil? #|| @parent == new_parent
    new_parent.children << self unless new_parent.nil? #|| new_parent.has_child?(self)
    @parent = new_parent 
  end

  def ==(node)
    return false if node.nil?
    @value == node.value
  end

  def has_child?(node)
    @children.any? { |child| child == node }
  end

  def remove_child(node)
    raise "Node is not a child" unless self.has_child?(node)#@children.delete(node)
    node.parent = nil 
  end

  def dfs(target_value)
    return self if @value == target_value

    @children.each do |child|
      result = child.dfs(target_value)
      return result unless result.nil?
    end

    nil
  end

  def bfs(target_value)
    nodes = [self]

    until nodes.empty?
      node = nodes.shift
      return node if node.value == target_value
      nodes = nodes.concat(node.children)
      # nodes += node.children
    end
  end

  def inspect
    "<#{PolyTreeNode} #{@value}>"
    # "<#{PolyTreeNode}:#{self.object_id} \n[\n#{pretty_print}\n]\n>"
  end

  def pretty_print(indent = 1)
    spacing = " " * (indent * 2)
    "#{spacing}#{@value}, \n#{spacing}[\n#{@children.map{|child| child.pretty_print(indent + 1)}.join}\n#{spacing}]"
  end
end
