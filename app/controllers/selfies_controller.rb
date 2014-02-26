class SelfiesController < ApplicationController


	def index

	end


	def create

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
      params.require(:selfie).permit(:image_url, :json_analysis, :votes, :latitude, :longitude, :user_id)
    end
end