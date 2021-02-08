require_relative "poly-tree-node"
require "set"

class KnightPathFinder

  OFFSETS = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [-1, -2],
    [-2, -1],
    [1, 2],
    [2, 1]
  ]

  attr_reader :root_node
  
  def self.valid_moves(pos)
    pos.all? { |ele| ele >= 0 && ele < 8 }
  end
  
  def initialize(pos)
    @root_node = PolyTreeNode.new(pos)
    @considered_pos = [pos]
    self.build_move_tree 
  end

  def build_move_tree 
    # self.root_node = PolyTreeNode.new(pos)
    # nodes = [self.root_node]

    nodes = [self.root_node]

    until nodes.empty?
      node = nodes.shift
      
      self.new_move_pos(node.value).each do |adj_pos| 
        adj_node = PolyTreeNode.new(adj_pos)
        nodes << adj_node
        adj_node.parent = node 
      end
      
    end
  end

  # def bfs(target_pos)
  #   visited = Set.new 
  #   queue = [@root_node]
  #   until queue.empty? 
  #     node = queue.shift 
  #     next if visited.include?(node)
  #     visited << node 
  #     return node if node.value == target_pos 
  #     node.neighbors.each do |neighbor|
  #       queue << neighbor 
  #     end
  #   end

  #   nil 

  # end

  def find_path(target_pos)
    node = @root_node.bfs(target_pos)
    path = []

    until node.nil? 
      path << node 
      node = node.parent 
    end

    return path.reverse 
  end

  def new_move_pos(pos)
    # suppose the starting position is [x, y]
    # all possible positions would be:
    x, y = pos 
    new_arr = []

    OFFSETS.each do |offset|
      i, j = offset
      new_pos = [x + i, y + j]

      if KnightPathFinder.valid_moves(new_pos) && !@considered_pos.include?(new_pos)

        @considered_pos << new_pos
        new_arr << new_pos 
      end
    end
    new_arr 
  end
end

# [0, 0]
# [1, 2], [2, 1]
# [3, 3], [0, 4], ...
# ...
if __FILE__ == $PROGRAM_NAME
  kpf = KnightPathFinder.new([0,0])
  p kpf.find_path([1, 2])
  p kpf.find_path([3, 3])
  p kpf.find_path([6, 6])
  p kpf.find_path([7, 7])
end