// Import necessary Node.js modules
const express = require("express"); // Import Express.js to create a web server
// const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction
const cors = require("cors"); // Import Cors for handling Cross-Origin Resource Sharing
// const UserModel = require("./model/Users"); // Import the User model from the models/users.js file
const https = require("https");

// Create an instance of the Express.js application
const app = express();


// Middleware setup:
app.use(express.json()); // Parse JSON data from incoming requests
app.use(express.urlencoded({extended: true}))
app.use(cors()); // Enable Cross-Origin Resource Sharing to allow requests from other domains

// // Connect to the MongoDB database at the specified URL
// mongoose.connect("mongodb://127.0.0.1:27017/user");

// // Define an HTTP POST route for user login
// app.post("/login", (req, res) => {
//     // Extract the email and password from the request body
//     const { email, password } = req.body;

//     // Search for a user in the database with the given email
//     UserModel.findOne({ email: email }).then((user) => {
//         if (user) {
//             // If a user with the email is found
//             if (user.password === password) {
//                 // If the provided password matches the stored password
//                 res.json("Success"); // Send a success response
//             } else {
//                 // If the provided password is incorrect
//                 res.json("The password is incorrect"); // Send a password error response
//             }
//         } else {
//             // If no user with the email is found
//             res.json("No record existed"); // Send a "no record" error response
//         }
//     });
// });

// Define an HTTP POST route for user registration
// app.post("/register", (req, res) => {
//     // Create a new user in the database using the data from the request body
//     UserModel.create(req.body)
//         .then((user) => res.json(user)) // Send the created user as a JSON response
//         .catch((err) => res.json(err)); // Send an error response if there's a problem
// });



let latitude = 0;
let longitude = 0;
const api_key = process.env.GOOGLE_API_KEY
console.log(api_key);

app.post("/address", (req, res) => {
    let addressData = req.body.address.address;
    console.log(`AddressReplace: ${addressData.replace(/ /g, "%20")}`);
    formattedAddress = addressData.replace(/ /g, "%20")
    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${api_key}`
    console.log(geocodeURL);
    https.get(geocodeURL, (response) => {
      let data = "";
      console.log(`Status Code: ${response.statusCode}`)

      response.on("data", (d) => {
        data += d;
        console.log(data);
        const geoData = JSON.parse(d)
      })
      .on("end", () => {
        try {
          const geocodeData = JSON.parse(data);
          if(geocodeData.results && geocodeData.results.length > 0){
            console.log(geocodeData.results[0].geometry.location.lat);
            console.log("^^^ LAT");
          }
        } catch (error) {
          console.log(error);
        }
      })
      .on("error", (err) => {
        console.log(err);
      });
    })
});


// Start the web server and listen on port 3001
app.listen(3001, () => {
    console.log("server is running");
});


