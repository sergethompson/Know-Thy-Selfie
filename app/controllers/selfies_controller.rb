IMAGE_ANALYSIS = true

class SelfiesController < ApplicationController


	def index
		@selfies = Selfie.all
		respond_to do |format|
			format.html
			format.json {render json: @selfies}
		end
	end


	def create
		# Instead of using CarrierWave's temporary files, we're using our own
		chart1 = selfie_params["photobooth_image_data"].split(',')
		image = Base64.decode64(chart1[1])

		tmp_filename = "#{Rails.root}/public/tmp/Selfie_" + DateTime.now.strftime("%Y%m%dT%H%M%S")+".png"

		File.open(tmp_filename, 'wb') do|f|
		  f.write(image)
		end
		
		# @selfie = Selfie.create({ image_url: selfie_params["image_url"], json_analysis: selfie_params["json_analysis"],
		# 													votes: selfie_params["votes"], latitude: selfie_params["latitude"], 
		# 			 										longitude: selfie_params["longitude"], user_id: selfie_params["user_id"] });

		# @selfie = Selfie.create({ image_url: "scootersURL_DATA", json_analysis: "scootersJSON_DATA",
		# 	votes: selfie_params["votes"], latitude: selfie_params["latitude"], 
		# 	longitude: selfie_params["longitude"], user_id: selfie_params["user_id"] });


	    new_selfie = Selfie.new
	    new_selfie.image_url = File.open(tmp_filename)

		# This is intentional -- We can't perform the image analysis until the image is on S3
		new_selfie.json_analysis = ""
		new_selfie.save

		#Now the image should be saved to S3.  At this point, we can send off the image information to our Rekognition analysis program to grab our analysis
		client = Rekognize::Client::Base.new(api_key: ENV['REKOGNIZE_API_KEY'], api_secret: ENV['REKOGNIZE_API_SECRET'])
	
		job = "face_detect_gender_race_emotion"

		ret_val = ""
		if (IMAGE_ANALYSIS)
			ret_val = client.face_detect(urls: new_selfie.image_url, jobs: job)
		end

		new_selfie.json_analysis = JSON.generate(ret_val)
		new_selfie.votes = 0
	    new_selfie.latitude = 40.7403775 #TODO: grab from Photo if available
	    new_selfie.longitude = -73.9909667 #TODO: grab from Photo if available
		new_selfie.save

		# Cleaning up after ourselves
		File.delete(tmp_filename)

		respond_to do |format|
			format.html {}
			format.json { render json: @selfie}
		end


	end


	def destroy
		@selfie = Selfie.find(params[:id])
		@selfie.destroy
		respond_to do |format|
			format.html {}
			format.json {render json: @selfie}
		end
	end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_selfie
    	@selfie = Selfie.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.

    def selfie_params
    	params.require(:selfy).permit(:image_url, :json_analysis, :votes, :latitude, :longitude, :user_id, :photobooth_image_data)
    end
  end
