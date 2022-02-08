const router = require('express').Router()
const vision = require('@google-cloud/vision')

const CONFIG = {
    credentials: {
        private_key: process.env.private_key,
        client_email: process.env.client_email,
    },
}

const client = new vision.ImageAnnotatorClient(CONFIG)

const detectText = async (file_path) => {
    let [result] = await client.textDetection(file_path)
    return result.fullTextAnnotation.text
}

// Need clarity on this, not sure of the route, or if I should be storing the photo somewhere
//Cloudvision API /api/user/:photouri
router.get('/', async (req, res, err) => {
    try {
        const word = 'API route is up and running'
        res.send(word)
    } catch (e) {
        console.log(e)
    }
})

router.post('/', async (req, res, err) => {
    try {
        const photoloc = await req.body.photouri
        let text = await detectText(photoloc)
        if (text !== null) {
            res.send(text)
        } else {
            res.status(503).send(`bad photo try again`)
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
