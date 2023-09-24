const express = require("express");
const router = express.Router();
const fs = require('fs')

const PATH_ROUTES = __dirname

const removeExtension = (filename)=>{

    //TODO tracks.js [ tracks , js ] : aki se toma el primer valor con el metodo shift() y con split se corta la cadena
    return filename.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file)

    if(name !== 'index'){
        router.use(`/${name}`,require(`./${file}`))
    }
})



module.exports = router