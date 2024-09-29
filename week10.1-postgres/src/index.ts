import { Client } from 'pg'

const client = new Client({
    connectionString: ""
})


async function createUserTable(){
    await client.connect() 
    try {
        //create a user table
        await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    } catch (error) {
        console.log("something went wrong in creating table") 
        return
    }finally{
        await client.end()
    }
}


async function createUserAndAddressTable(){
    await client.connect()                                  // Ensure client connection is established  

    //create two tables that are related to each other
    try {
        const userTable = await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
    `)
    console.log("User table created: ", userTable);

    const addressTable = await client.query(`
        CREATE TABLE IF NOT EXISTS addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `)
    console.log("Address table created: ", addressTable);
    
    } catch (error) {
        console.log("something went wrong in creating table") 
        return   
    }finally{
        console.log("Tables created, closing the db")
        await client.end()
    }
}


// ---------------------------------------------------------------------------------

//this is not the correct way
// async function insertData(){
//     const user = "INSERT INTO users (username, email, password) VALUES ('jo','joh@gmail.com', '123')"
//     const res = await client.query(user)
//     console.log('Insertion success:', res);
// }


async function insertUser(username: string, email: string, password: string){
    try {
        await client.connect()  

        //SQL Query
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *"
        const values = [username, email, password]

        const res = await client.query(insertQuery, values);
        
        //return inserted data
        console.log(res);
    } catch (error) {
        console.log("Something went wrong")
    }finally{
        await client.end();
    }
}


async function getUserWithUsernameAndMail(username: string, email: string, ){
    try {
        await client.connect()  
        const findQuery = "SELECT * FROM users WHERE username = $1 AND email = $2"
        const res = await client.query(findQuery, [username, email]);

        if(res.rows.length > 0){
            console.log("User found: ", res.rows[0]);
        }else{
        console.log('No user found with the given email.');
            return null;
        }
    } catch (error) {
        console.log("something went wrong when searching for user")
    }finally{
        await client.end()
    }
}

// --------------------------------------------------------------------------------------------



async function insertInUser(username: string, email: string, password: string){
    try {
        await client.connect()
        const insertQ = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)"

        const result = await client.query(insertQ, [username, email, password]);
        console.log(result);
    } catch (error) {
        console.log("something wnet wrong when inserting in user table", error)
    }finally{
        console.log("user created, closing the db")
        await client.end()
    }

}

async function insertInAddress(user_id: number, city: string, country: string, street: string, pincode: string){
    try {
        await client.connect()
        const insertQ = "INSERT INTO addresses (user_id ,city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)"

        const result = await client.query(insertQ, [user_id, city, country, street, pincode]);
        console.log(result);
    } catch (error) {
        console.log("something wnet wrong when inserting in address table", error)
    }finally{
        console.log("address inserted, closing the db")
        await client.end()
    }

}

async function getUserWithId(id:number){
    try {
        await client.connect()

        const q = "SELECT city, country, street, pincode FROM addresses WHERE user_id = $1"
        const res = await client.query(q, [id]);

        if(res.rows.length > 0){
            console.log("User found: ", res.rows[0]);
        }else{
            console.log('No user found with the given id.');
            return null;
        }
    } catch (error) {
        console.log("Something went wrong when fetching user with id", error)
    }   finally{
        await client.end()
    }
}


console.log("In progress...")

// createUserTable();
// insertUser("pk2", "pk2@gmail.com", "4545452")
// getUserWithUsernameAndMail("pk", "pk@gmail.com")

// createUserAndAddressTable()
// insertInUser("hellow", "hello@gmail.com", "12345")
// insertInAddress(1, "Banaras", "India", "Chowk", "24157")
// getUserWithId(1)
