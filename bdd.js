const mongoose = require('mongoose');
const uri = "mongodb+srv://mikaelyandriapro:Melodia69009@isitest.pjwhhm1.mongodb.net/?retryWrites=true&w=majority";



mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}) // je me connecte à la base de donnée
.then(() => console.log('Connected to MongoDB')) // si la connexion est réussie, j'affiche un message
.catch(err => console.log(err)); // sinon j'affiche l'erreur


