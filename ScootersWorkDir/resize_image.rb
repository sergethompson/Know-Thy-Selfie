require 'RMagick'
include Magick

ARGV.each do |filename|
	cat = ImageList.new(filename)
	cat.display
end