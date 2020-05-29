# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.create!(first_name: "Luke", last_name: "Skywalker", phone:1111111111, email: "luke@fakemail.com", password:'password', location: 'New York', department:'Engineering', title:'Software Developer')
user2 = User.create!(first_name: "Bryan", last_name: "Berger", phone:1111111111, email: "bryan@fakemail.com", password:'password', location: 'New York', department:'Engineering', title:'Software Developer')
user3 = User.create!(first_name: "Erin", last_name: "Hill", phone:1111111111, email: "erin@fakemail.com", password:'password', location: 'London', department:'Engineering', title:'Software Developer')
user4 = User.create!(first_name: "Clint", last_name: "Osterholz", phone:1111111111, email: "clint@fakemail.com", password:'password', location: 'San Francisco', department:'Engineering', title:'Software Developer')
user5 = User.create!(first_name: "Cathleen", last_name: "Wright", phone:1111111111, email: "cathleen@fakemail.com", password:'password', location: 'Paris', department:'Engineering', title:'Software Developer')
user6 = User.create!(first_name: "Chris", last_name: "Limbrick", phone:1111111111, email: "chris@fakemail.com", password:'password', location: 'Rome', department:'Engineering', title:'Software Developer')
user7 = User.create!(first_name: "Joanna", last_name: "Choi", phone:1111111111, email: "joanna@fakemail.com", password:'password', location: 'London', department:'Engineering', title:'Software Developer')
user8 = User.create!(first_name: "Anna", last_name: "Chumakova", phone:1111111111, email: "anna@fakemail.com", password:'password', location: 'San Francisco', department:'Engineering', title:'Software Developer')
user9 = User.create!(first_name: "Emily", last_name: "Blargan", phone:1111111111, email: "emily@fakemail.com", password:'password', location: 'Paris', department:'Engineering', title:'Software Developer')
user10 = User.create!(first_name: "Artemie", last_name: "Amari", phone:1111111111, email: "artemie@fakemail.com", password:'password', location: 'Rome', department:'Engineering', title:'Software Developer')
user11 = User.create!(first_name: "Jowel", last_name: "Rosario", phone:1111111111, email: "jowel@fakemail.com", password:'password', location: 'London', department:'Engineering', title:'Software Developer')


squad12=Squad.create!(name: 'Pepper', users: '3')

member1=Member.create!(user_id: 3, squad_id: 5)

puts "#{User.count} users were created"
puts "#{Squad.count} users were created"
puts "#{Member.count} users were created"