class Selfie < ActiveRecord::Base
	mount_uploader :image_url, ImageOnAwsUploader 
#	mount_uploader :avatar, AvatarUploader
end
