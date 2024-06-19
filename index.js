// Connexion à la base de données
const  mongoose  = require("mongoose");

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Sucessfully connection')
});

//Définition du medèle de personne
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
});
module.exports = mongoose.model('Person', personSchema);

// Création du modèle de personne
const Person = mongoose.model('Person', personSchema);

// Création d'une instance de document
const newPerson = new Person({
    fullname: "Pape Biaye",
    age: 30,
    favoriteFoods: ["pizza", "mafé"],
});

// Enrégistrement du document

newPerson.save((error, person)  => {
if (error) {
console.error('Error saving person:', error);
    return;
    }

    console.log('Person saved:', person);
});

//Création de plusieurs personnes 
const arrayOfPeople = [
    { name: "Pape", age: 42, favoriteFoods: ["riz", "mafé"] },
    { name: "Emma", age: 25, favoriteFoods: ["burgers", "poulet"] },
    { name: "Wilfrid", age: 40, favoriteFoods: ["frites", "salad"] },
];

Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error) {
    console.error('Error creating people:', error);
    return;
    }

    console.log('People created:', createdPeople);
});

// Recherche de toutes les personnes avec un aliment préféré donné
Person.find({ name: "Pape" }, (error, people) => {
    if (error) {
    console.error('Error finding people:', error);
    return;
    }

    console.log('People found:', people);
});

//  Recherche d'une seule personne avec un aliment préféré donné
Person.findOne({ favoriteFoods: "pizza" }, (error, person) => {
    if (error) {
    console.error('Error finding person')
    }});