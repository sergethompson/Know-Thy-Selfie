class Selfie < ActiveRecord::Base
	mount_uploader :image_url, ImageOnAwsUploader 

	# Creates the caption based on the JSON analysis from the image analysis program
	def self.create_caption(json_analysis) 
		ret_string_ar = []
		#ERROR
		if (json_analysis.has_key?("face_detection") == false)
			#We have a problem houston!  No face detection happened!
			return "Did not recognize a face #{__FILE__} : #{__LINE__}"
		end

		if (json_analysis["face_detection"].length < 1)
			#We have a problem...  There WAS a face detected but there's no pose
			return "Did not recognize a face #{__FILE__} : #{__LINE__}"
		end
		face = json_analysis["face_detection"][0]

		if (face["age"] > 26)
			ret_string_ar.push("New York selfies average a bit older")
		elsif (face["age"] < 23.3)
			ret_string_ar.push("The selfies in Sao Paulo tend to skew very young")
		end

		if (face["pose"]["roll"].abs > 8) #Head tilted to the side
			ret_string_ar.push("Nice tilt!  Are you from Sao Paulo?")
		elsif (face["pose"]["pitch"] > 8) #Looking DOWN
			ret_string_ar.push("Is it raining?")
		elsif (face["pose"]["pitch"] < -8) #Looking UP
			ret_string_ar.push("Japanese selfies tend to look down")
		end

		if (face["emotion"].has_key?("happy"))		
			if (face["emotion"]["happy"] > 0.50)
				ret_string_ar.push("Bangkok has the most smiles") #Like you, few Moscovites smile in their Selfies
			end
		end

		if (face["emotion"].has_key?("confused"))
			if (face["emotion"]["confused"] > 0.50)
				ret_string_ar.push("Do you have any questions?")
			end
		end

		if (face["emotion"].has_key?("sad"))
			if (face["emotion"]["sad"] > 0.50)  
				ret_string_ar.push("Let’s talk about it :-(")
			end
		end

		if (face["emotion"].has_key?("angry"))
			if (face["emotion"]["angry"] > 0.50)  
				ret_string_ar.push("So this guy walks into a bar.  Ouch!")
			end
		end

		if (face["smile"] > 0.81)
			ret_string_ar.push("Nice smile!  Bangkok has the most smiles")
		end

		if (face["smile"] < 0.2)
			ret_string_ar.push("Hardly anyone smiles in Moscow")
		end


		if (face["sex"].abs < 0.20)
			ret_string_ar.push("Foxy lady!")
		elsif (face["sex"].abs > 0.80)
			ret_string_ar.push("Hey Dude!")
		end

		if (face["glasses"] > 0.50)
			ret_string_ar.push("Nice Glasses!")
		end

		if (face["smile"] > 0.50)
			ret_string_ar.push("Nice smile!")
		end

		if (face["eye_closed"] > 0.50)
			ret_string_ar.push("Are you winking at me with both eyes?")
		end


puts "Potential strings: #{ret_string_ar.to_s}"
#binding.pry
		return ret_string_ar.sample
	end


	# The image analysis returns a Ruby Hash with lots of values.  They are typically things like "Smile" and "confidence" (ie, 95% confidence the person is smiling).  It is NOT saying "This person is smiling 95% of their ability to smile".
	def self.set_analysis_values(in_selfie, ret_val)
		#ERROR
		if (ret_val.has_key?("face_detection") == false)
			#We have a problem houston!  No face detection happened!
			return "No face detection key: No confidence values to set! #{__FILE__} : #{__LINE__}"
		end

		if (ret_val["face_detection"].length < 1)
			#We have a problem...  There WAS a face detected but there's no pose
			#return "face_detection array is length 0.  Unable to set confidence values. #{__FILE__} : #{__LINE__}"
			return "Only about 4% of photos taken are selfies"
		end

		if (ret_val["face_detection"].length > 1)
			#We have a problem...  There WAS a face detected but there's no pose
			#return "face_detection array is length: #{in_selfie["face_detection"].length}.  But we're only setting confidence values for [0] #{__FILE__} : #{__LINE__}"
			puts "Looks like more than one face in the photo...  But only analyzing the first"
		end

		in_selfie.caption = Selfie.create_caption(ret_val)

		face = ret_val["face_detection"][0]

		in_selfie.age 			= face["age"]
		in_selfie.race_string 	= face["race"].keys[0]
		in_selfie.race_conf 	= face["race"][in_selfie.race_string]

		if (face["emotion"].has_key?("confused")) 
			in_selfie.confused	= face["emotion"]["confused"]
		end
		if (face["emotion"].has_key?("calm")) 	  
			in_selfie.confused	= face["emotion"]["calm"]
		end
		if (face["emotion"].has_key?("angry") )	  
			in_selfie.angry		= face["emotion"]["angry"]
		end
		if (face["emotion"].has_key?("happy") )	  
			in_selfie.angry		= face["emotion"]["happy"]
		end
		if (face["emotion"].has_key?("sad") )	  
			in_selfie.angry		= face["emotion"]["sad"]
		end
		if (face["emotion"].has_key?("surprised") )	  
			in_selfie.angry		= face["emotion"]["surprised"]
		end

		in_selfie.roll 		= face["pose"]["roll"]
		in_selfie.yaw  		= face["pose"]["yaw"]
		in_selfie.pitch 	= face["pose"]["pitch"]

		in_selfie.smile 	= face["smile"]
		in_selfie.glasses 	= face["glasses"]
		in_selfie.eye_closed 	= face["eye_closed"]
		in_selfie.sex		= face["sex"]

	end


end
