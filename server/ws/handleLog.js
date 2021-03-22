const fs = require('fs')

const getLog = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./errorLog.txt', (err, data) => {
            const content = data.toString()
            resolve(content)
            if (err) {
                reject(err)
            }
        }) 
    })
}

module.exports = getLog