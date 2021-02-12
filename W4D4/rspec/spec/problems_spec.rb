require "problems"

# describe "you are over qualified" do
#   it "should say you are over-qualified" do
#     expect{raise "you are over-qualified"}.to raise_error("you are over-qualified")
#   end
# end

describe "my_uniq" do
  it "will return unique elements whichever first appears" do
    expect([1,2,1,3,3].my_uniq).to eq([1,2,3])
  end
end

describe "two_sum" do
  #before(:each) do
    let (:start_arr) { [-1,0,2,-2,1].two_sum }
  #end

  it "find all pairs of positions where elements at those positions sum to zero" do
    expect(start_arr).to eq([[0, 4], [2, 3]])
  end

  it "will sort the pairs dictionary-wise" do
    expect(start_arr).to_not eq([[2, 3], [0, 4]])
  end
end

describe "my_transpose" do 
  it "should transpose an array with fixed length and width" do
    arr = [[1,2,3], [4,5,6], [7,8,9]]
    expect(my_transpose(arr)).to eq([[1,4,7], [2,5,8], [3,6,9]])
  end

  it "should deal with empty arrays correctly" do 
    expect(my_transpose([])).to be_empty
  end

  it "should raise error if the argument is not an array" do
    expect { my_transpose(1) }.to raise_error(ArgumentError)
  end
end

describe "stock_picker" do 
  it "should take an array as an argument without raising errors" do
    expect{stock_picker([])}.to_not raise_error
  end

  it "should the pair of days of buying or selling that maximize the profit" do
    expect(stock_picker([2, 3, 1, 4, 5, 3])).to eq([2, 4])
  end

  it "should correctly deal with cases in which buying or selling stocks do not make profit" do
    expect(stock_picker([5, 4, 3, 2, 1])).to eq([])
  end
end




