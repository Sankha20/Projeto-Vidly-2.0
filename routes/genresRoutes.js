const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.use(express.json())

const genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Pagode' },
    { id: 3, name: 'Samba' },
    { id: 4, name: 'MPB' },
]


router.get('/:id', (request, response) => {

    const idError = isValidId(request.params)
    
    if (idError) return response.status(404).send(idError.details[0].message)

    const id = parseInt(request.params.id)
    const genre = genres.find(genre => genre.id === id)

    if (!genre) return response.status(404).send("No gender with this id was found.")

    response.send(genre)
})


router.post('/', (request, response) => {

    const nameError = isValidName(request.body)
    if (nameError) return response.status(404).send(nameError.details[0].message)

    const name = request.body.name
    const genre = genres.find(genre => genre.name === name)
    if (genre) return response.status(404).send("Genre already in the database.")

    const newGenre = {
        id: genres.length + 1,
        name: name
    }

    genres.push(newGenre)
    response.send(newGenre)
})


router.put('/:id', (request, response) => {

    const idError = isValidId(request.params)    
    if (idError) return response.status(404).send(idError.details[0].message)

    const nameError = isValidName(request.body)
    if (nameError) return response.status(404).send(nameError.details[0].message)

    const id = parseInt(request.params.id)

    let genre = genres.find(genre => genre.id === id)
    if (!genre) return response.status(404).send("Genre not found.")

    genre.name = request.body.name

    response.send(genre)
})


router.delete('/:id', (request, response) => {
    const idError = isValidId(request.params)    
    if (idError) return response.status(404).send(idError.details[0].message)

    const id = parseInt(request.params.id)

    const index = genres.findIndex(genre => genre.id === id)
    if (index < 0) return response.status(404).send("Genre ID not found.")

    const genre = genres[index]
    genres.splice(index, 1)

    response.send(genre)
})

// Validation
const isValidName = (params) => {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(3)
    })

    return schema.validate(params).error
}


const isValidId = (params) => {
    const schema = Joi.object({
        id: Joi.number()
            .integer()
            .required()
    })

    return schema.validate(params).error
}

module.exports = router
