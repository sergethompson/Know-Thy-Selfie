class SelfiesController < ApplicationController


	def index
		@selfies = Selfie.all
		respond_to do |format|
			format.html
			format.json {render json: @selfies}
		end
	end


	def create


		photobooth_image_data = selfie_params["photobooth_image_data"]

		@selfie = Selfie.create({ image_url: selfie_params["image_url"], json_analysis: selfie_params["json_analysis"],
															votes: selfie_params["votes"], latitude: selfie_params["latitude"],
					 										longitude: selfie_params["longitude"], user_id: selfie_params["user_id"] });

		# @selfie = Selfie.create({ image_url: "scootersURL_DATA", json_analysis: "scootersJSON_DATA",
		# 	votes: selfie_params["votes"], latitude: selfie_params["latitude"],
		# 	longitude: selfie_params["longitude"], user_id: selfie_params["user_id"] });


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
