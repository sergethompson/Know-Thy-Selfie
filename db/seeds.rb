# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

images = ["https://s3.amazonaws.com/Selfie_Bucket/public_dir/Sam+surprised.jpg_resized.jpg", "https://s3.amazonaws.com/Selfie_Bucket/public_dir/Scooter+normal.jpg_resized.jpg", "https://s3.amazonaws.com/Selfie_Bucket/public_dir/Scooter+Tilt.jpg_resized.jpg", "https://s3.amazonaws.com/Selfie_Bucket/public_dir/Brad%20fuzzy.jpg"]

images.each do |image|
	client = Rekognize::Client::Base.new(api_key: ENV['REKOGNIZE_API_KEY'], api_secret: ENV['REKOGNIZE_API_SECRET'])
	
	#image_url = "http://oi60.tinypic.com/245ynti.jpg"
	job = "face_detect_gender_race_emotion"
	ret_val = client.face_detect(urls: image, jobs: job)

	my_selfie = Selfie.new
	my_selfie.image_url = image
	my_selfie.json_analysis = JSON.generate(ret_val)
	my_selfie.votes = 0
    my_selfie.latitude = 40.7403775 #TODO: grab from Photo if available
    my_selfie.longitude = -73.9909667 #TODO: grab from Photo if available
	my_selfie.save

end

























