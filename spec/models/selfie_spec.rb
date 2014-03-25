require 'spec_helper'
describe Selfie do
  describe "given a selfie data set" do
    before do
      @selfie = Selfie.create({
        image_url: "image.com",
        json_analysis: "json_string testing",
        votes: 3,
        latitude: 43.55,
        longitude: 73.53,
        user_id: 4
        })
    end
    it "should "
    it "should have the selfie saved and return the right values" do
      @selfies = Selfie.all
      @selfies.count.should be 1
      @selfies[0][:image_url].should be"image.com"
      @selfies[0][:json_analysis].should be "json_string testing"
      end
    #Unique IDs
  end
end
