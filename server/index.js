const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
// const seed = require('./db/seed')

let PORT = process.env.PORT
if (PORT == null || PORT == '') {
    PORT = 8000
}

const init = async () => {
    try {
        // await seed()
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

init()
