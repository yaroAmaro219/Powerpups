# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.create!(first_name: "Luke", last_name: "Skywalker", phone:1111111111, email: "hell@hello.com", password:'Luke12345', location: 'Brooklyn', department:'Good', title:'7PM')
squad1=Squad.create!(name: 'Power Pups')

puts "#{User.count} users were created"
puts "#{Squad.count} users were created"