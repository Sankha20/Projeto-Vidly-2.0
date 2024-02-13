const express = require("express")

/**
 * 
 * @param {int} code
 * @param {express.Response} response
 */
const sendCode = (code, response) => {
    let message = ''

    switch (code) {
        case 404:
            message = "Page not found"
            break
        
        case 500:
            message = "Internal server error"
            break
        
        default:
            'An error ocurred'
    }

    return response.status(code).send(message)
}

module.exports = sendCode