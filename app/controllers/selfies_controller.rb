class SelfiesController < ApplicationController


	def index
		@selfies = Selfie.all
		respond_to do |format|
			format.html
			format.json {render json: @selfies}
		end
	end


	def create
		#		@selfie = Selfie.create(selfie_params)
		respond_to do |format|
			format.html {}
			format.json { render json: @selfie}
		end

		base_64_image_string = params["json_analysis"]

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
    #    def set_selfy
    #   @selfy = Selfie.find(params[:id])
    # end
    def set_selfie
      @selfie = Selfie.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.

    #params.require(:selfy).permit(:image_url... def selfy_params...      before
    def selfie_params
    	# params.require(:selfie).permit(:image_url, :json_analysis, :votes, :latitude, :longitude, :user_id)

      params.permit(:json_analysis)
    end
end