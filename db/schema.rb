# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_22_143138) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.bigint "squad_id", null: false
    t.string "title"
    t.string "description"
    t.datetime "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["squad_id"], name: "index_events_on_squad_id"
  end

  create_table "members", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "squad_id", null: false
    t.boolean "is_admin"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["squad_id"], name: "index_members_on_squad_id"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.text "post"
    t.bigint "user_id", null: false
    t.bigint "squad_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["squad_id"], name: "index_posts_on_squad_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "squads", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "users"
  end

  create_table "squads_users", id: false, force: :cascade do |t|
    t.bigint "squad_id", null: false
    t.bigint "user_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "location"
    t.string "department"
    t.string "title"
    t.string "phone"
    t.string "status"
    t.binary "image"
    t.string "birthday"
    t.string "pronoun"
    t.boolean "manager"
  end

  add_foreign_key "events", "squads"
  add_foreign_key "members", "squads"
  add_foreign_key "posts", "squads"
  add_foreign_key "posts", "users"
end
