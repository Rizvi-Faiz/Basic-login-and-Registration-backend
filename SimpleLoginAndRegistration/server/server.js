import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const port = 8000;
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "SampleWeb",
    password: "faiz2003",
    port: 5432,
});
db.connect()

// app.get("/", (req, res) => {
//     res.send({status:true});
// });

// app.get("/login", (req, res) => {
//     res.send({status:true});
// });

// app.get("/register", (req, res) => {
//     res.send({status:true});
// });

app.post("/register", async (req, res) => {
    console.log(req.body);
    const  name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        
        console.log("hello");
        if (checkResult.rows.length > 0) {
            console.log("Email already exists. Try logging in.");
            res.send({output:"Email already exists. Try logging in.",status:false});
        } else {
            //hashing the password and saving it in the database
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    res.send({output:"Error registering. Please try again later",status:false});
                } else {
                    console.log("Hashed Password:", hash);
                    await db.query(
                        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
                        [name,email, hash]
                        );
                        res.send({output:"Registeration Successful",status:true});
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    });
    
    app.post("/login", async (req, res) => {
        const email = req.body.email;
        const loginPassword = req.body.password;
        
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            //verifying the password
            const match = bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    res.send({output:"Error, Please try again later",status:false});
                } else {
                    if (result) {
                        res.send({output:"User Logged In",status:true});
                    } else {
                        res.send({output:"Incorrect Password",status:false});
                    }
                }
            });
        } else {
            res.send({output:"User not found.Try Registering",status:false});
        }
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

