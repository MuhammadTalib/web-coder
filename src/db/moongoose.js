const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://taskapp:pak99haj@cluster0-udkja.mongodb.net/taskapp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
