# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140303184240) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "selfies", force: true do |t|
    t.string   "image_url"
    t.string   "show_url"
    t.text     "json_analysis"
    t.integer  "votes"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "caption"
    t.float    "age"
    t.string   "race_string"
    t.float    "race_conf"
    t.float    "confused"
    t.float    "calm"
    t.float    "angry"
    t.float    "happy"
    t.float    "sad"
    t.float    "roll"
    t.float    "pitch"
    t.float    "yaw"
    t.float    "smile"
    t.float    "sex"
    t.float    "surprised"
    t.float    "eye_closed"
    t.float    "glasses"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
