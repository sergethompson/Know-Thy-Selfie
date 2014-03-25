json.array!(@selfies) do |selfy|
  json.extract! selfy, :id, :image_url, :json_analysis, :votes, :latitude, :longitude
  json.url selfy_url(selfy, format: :json)
end
