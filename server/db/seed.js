//There are some performance fixes I could make here, including pools.
// Took way more time than I would like to admit, connecting to DB's is Freaking Hard
const { SQL, client } = require('./db')

// Would not recommend doing this, I have a feeling its insanely insecure when combined with
// What I did on line 49 with the for loop.

// Dropping Old Tables and Creating New Tables
const seed = async function () {
    const FIRST_NAME = ['Craig', 'Ryan', 'Tim']
    const LAST_NAME = ['Dos Santos', 'Slattery', 'Janssen']
    const BIRTHDATE = ['Jan5th', 'Dec5th', 'July6th']
    const EMAIL = ['test@gmail.com', 'start@gmail.com', 'engine@gmail.com']

    //SQL syntax for dropping a table if exists and recreating
    const REBUILD = `DROP TABLE IF EXISTS 
    users, pictures, notes, collections; 
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        birthdate VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL
    );
    CREATE TABLE pictures (
        id SERIAL PRIMARY KEY,
        image_location VARCHAR(500) NOT NULL,
        is_translated BOOLEAN DEFAULT false
    );
    CREATE TABLE notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        section INT,
        collection_id INT NOT NULL,
        picture_id INT NOT NULL,
        translated_text TEXT
    );
    CREATE TABLE collections (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        user_id INT
    );`

    let values = []
    let text = SQL`INSERT INTO users (firstname, lastname, birthdate, email) VALUES($1, $2, $3, $4)`

    try {
        await client.connect()
        await client.query(REBUILD)
        //Creating users from static data above
        for (let i = 0; i < FIRST_NAME.length; i++) {
            values.push(FIRST_NAME[i], LAST_NAME[i], BIRTHDATE[i], EMAIL[i])
            await client.query(text, values)
            //resetting values so length is never larger than 4.
            values = []
        }
        await client.end()
    } catch (e) {
        console.log(e)
        process.exitCode = 1
    }
}

module.exports = seed
