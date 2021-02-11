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
  before(:each) do
    start_arr = [-1,0,2,-2,1].two_sum
  end

  it "find all pairs of positions where elements at those positions sum to zero" do
    expect(start_arr).to eq([[0, 4], [2, 3]])
  end

  it "will sort the pairs dictionary-wise" do
    expect(start_arr).to_not eq([[2, 3], [0, 4]])
  end
end



