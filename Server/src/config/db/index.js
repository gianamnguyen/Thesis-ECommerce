const mongoose = require("mongoose");

const db = require("../../app/models");
const Role = db.role;

// gianam974
// GGDQ8RqKWfhMEC1P

// const url = "mongodb+srv://gianam974:424411@cluster0.hozfdks.mongodb.net/ecommerce_dev?retryWrites=true&w=majority"

const url = "mongodb+srv://gianam974:GGDQ8RqKWfhMEC1P@cluster0.dtw2zx0.mongodb.net/ecommerce_dev?retryWrites=true&w=majority"

async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
    initial();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = { connect };
