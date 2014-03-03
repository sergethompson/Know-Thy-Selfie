# Constants
IMAGE_ANALYSIS = true
REKOGNIZE_JOBS = "face_age_eye_closed_gender_race_emotion_face_recognize"
TMP_FILE_PREFIX = "#{Rails.root}/public/tmp/Selfie_"
TMP_FILE_SUFFIX = ".png"


# The Selfies Controller for handing our actions
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

		tmp_filename = TMP_FILE_PREFIX + DateTime.now.strftime("%Y%m%dT%H%M%S") + TMP_FILE_SUFFIX

		File.open(tmp_filename, 'wb') do|f|
		  f.write(image)
		end
		
	    new_selfie = Selfie.new
	    new_selfie.image_url = File.open(tmp_filename)

		# This is intentional -- We can't perform the image analysis until the image is on S3
		new_selfie.json_analysis = ""

		# Here's where the CarrierWave S3 magic happens.  When the new_selfie is saved, CarrierWave is activated and transports the object saved in image_url to S3.  This connection is made in the selfie.rb Model by declaring an uploader
		new_selfie.save

		#Now the image should be saved to S3.  At this point, we can send off the image information to our Rekognition image analysis api to grab our analysis
		client = Rekognize::Client::Base.new(api_key: ENV['REKOGNIZE_API_KEY'], api_secret: ENV['REKOGNIZE_API_SECRET'])
	
		ret_val = ""
		if (IMAGE_ANALYSIS)
			#NOTE the ret_val type is a Ruby HASH
			ret_val = client.face_detect(urls: new_selfie.image_url, jobs: REKOGNIZE_JOBS)
		end

		#Transform the hash into a JSON object for storage
		new_selfie.json_analysis = JSON.generate(ret_val)

		# The reason we need this data member is because we cannot access 'new_selfie.image_url.url' in JavaScript
		new_selfie.show_url = new_selfie.image_url.url

		Selfie.set_analysis_values(new_selfie, ret_val)

		new_selfie.votes = 0
	    new_selfie.latitude = 40.7403775 #TODO: grab from Photo if available
	    new_selfie.longitude = -73.9909667 #TODO: grab from Photo if available
		new_selfie.save

		# Cleaning up after ourselves
		File.delete(tmp_filename)

		respond_to do |format|
			format.html {}
			format.json { render json: new_selfie}
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
    	params.require(:selfy).permit(:caption, :show_url, :image_url, :json_analysis, :votes, :latitude, :longitude, :user_id, :photobooth_image_data)
    end

end
