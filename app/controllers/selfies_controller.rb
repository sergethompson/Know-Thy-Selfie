IMAGE_ANALYSIS = true
#REKOGNIZE_JOBS = "face_detect_gender_race_emotion_face_recognize"
REKOGNIZE_JOBS = "face_age_eye_closed_gender_race_emotion_face_recognize"
#REKOGNIZE_JOBS = "face_recognize"

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
		
	    new_selfie = Selfie.new
	    new_selfie.image_url = File.open(tmp_filename)

		# This is intentional -- We can't perform the image analysis until the image is on S3
		new_selfie.json_analysis = ""
		#binding.pry
		new_selfie.save

		#Now the image should be saved to S3.  At this point, we can send off the image information to our Rekognition api to grab our analysis
		client = Rekognize::Client::Base.new(api_key: ENV['REKOGNIZE_API_KEY'], api_secret: ENV['REKOGNIZE_API_SECRET'])
	
		ret_val = ""
		if (IMAGE_ANALYSIS)
			#NOTE the ret_val type is a Ruby HASH
			ret_val = client.face_detect(urls: new_selfie.image_url, jobs: REKOGNIZE_JOBS)
		end

		#Transform the hash into a JSON object for storage
		new_selfie.json_analysis = JSON.generate(ret_val)
#binding.pry
		new_selfie.show_url = ret_val["url"]

#		new_selfie.caption = create_caption_from_json_analysis(new_selfie.json_analysis) 
#binding.pry


		new_selfie.caption = create_caption_from_json_analysis(ret_val) 

		new_selfie.votes = 0
	    new_selfie.latitude = 40.7403775 #TODO: grab from Photo if available
	    new_selfie.longitude = -73.9909667 #TODO: grab from Photo if available
		new_selfie.save

		# Cleaning up after ourselves
		File.delete(tmp_filename)

		respond_to do |format|
			format.html {}
			format.json { render json: @new_selfie}
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


	def create_caption_from_json_analysis(json_analysis) 
		ret_string = ""
		#ERROR
		if (json_analysis.has_key?("face_detection") == false)
			#We have a problem houston!  No face detection happened!
			return "Did not recognize a face #{__LINE__}"
		end

		if (json_analysis["face_detection"].length < 1)
			#We have a problem...  There WAS a face detected but there's no pose
			return "Did not recognize a face #{__LINE__}"
		end

		face = json_analysis["face_detection"][0]

		if (face["pose"]["roll"].abs > 8) #Head tilted to the side
			ret_string = "Nice tilt!  Are you from Sao Paulo?"
		elsif (face["pose"]["pitch"] > 8) #Looking DOWN
			ret_string = "Is it raining?"
		elsif (face["pose"]["pitch"] < -8) #Looking UP
			ret_string = "Japanese selfies tend to look down"
		end


		if (face["age"] > 26)
			ret_string = "New York selfies average a bit older"
		elsif (face["age"] < 23.3)
			ret_string = "The selfies in Sao Paulo tend to skew very young"
		end

		if (face["emotion"].has_key?("happy"))		
			if (face["emotion"]["happy"] > 50)
				ret_string = "Bangkok has the most smiles" #Like you, few Moscovites smile in their Selfies
			end
		end

		if (face["emotion"].has_key?("confused"))
			if (face["emotion"]["confused"] > 50)
				ret_string = "Do you have any questions?"
			end
		end

		if (face["emotion"].has_key?("sad"))
			if (face["emotion"]["sad"] > 50)  
				ret_string = "Let’s talk about it :-("
			end
		end

		if (face["emotion"].has_key?("angry"))
			if (face["emotion"]["angry"] > 50)  
				ret_string = "So this guy walks into a bar.  Ouch!"
			end
		end

		if (face["smile"] > 81)
			ret_string = "Nice smile!  Bangkok has the most smiles"
		end


		if (ret_string.length == 0)
			if (face["sex"].abs < 20)
				ret_string = "Foxy lady!"
			elsif (face["sex"].abs > 80)
				ret_string = "Hey Dude!"
			else
				ret_string = "Sorry, facial recognition failed to report anything interesting about this photo"
			end
		end
		return ret_string		
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
