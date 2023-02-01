const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

  if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log(process.argv.length)
    console.log('give 1 or 3 arguments')
    process.exit(1)
  }


const password = process.argv[2]
const url = `mongodb+srv://teo:${password}@cluster0.qyzod40.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log("phonebook")
        persons.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(person => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}


