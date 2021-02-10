const express = require("express");
const session = require("express-session");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const BodyParser = require("body-parser");
const cors = require("cors");
const bycrypt = require("bcrypt");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cors());

// Use Session
app.use(
  session({
    secret: "mytokensecret",
  })
);

// MongoDB Connection
const CONNECTION_URL =
  "mongodb+srv://varun:varun123@cluster0.q4zuc.mongodb.net/test?retryWrites=true";

const DATABASE_NAME = "profiles";

let db, collection;

MongoClient.connect(
  CONNECTION_URL,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    db = client.db(DATABASE_NAME);
    collection = db.collection("users");
    console.log("Connected to " + DATABASE_NAME + "!");
  }
);

// Root Route
app.get("/", (req, res) => {
  res.send("Health ok");
});

// User Route
app.get("/users", (req, res) => {
  console.log(req.session.user);
  if (!req.session.user) return res.status(400).send("No Session Found");
  if (req.session.user.role !== "admin")
    return res.send("You are not allowed here");
  collection.find({}).toArray((err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Get User By ID
app.get("/users/:id", (req, res) => {
  if (!req.session.user) return res.status(400).send("No Session Found");
  if (req.session.user.role !== "admin")
    return res.send("You are not allowed here");
  collection.findOne({ _id: new ObjectId(req.params.id) }, (err, result) => {
    if (err) return res.status(404).send(err);
    res.send(result);
  });
});

// Add User Route
app.post("/register", (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: bycrypt.hashSync(req.body.password, 10),
    role: req.body.role ? req.body.role : "user",
    isActive: req.body.isActive ? req.body.isActive : true,
  };
  collection.find({ email: user.email }).toArray((err, result) => {
    if (result.length > 0) return res.status(400).send("Duplicate Data Found");
    collection.insertOne(user, (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User Added");
    });
  });
});

// Login User Route
app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
  };
  collection.findOne(user, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result === null) return res.status(400).send("User not found");
    const password = bycrypt.compareSync(req.body.password, result.password);
    if (!password) return res.status(400).send("Wrong Password");
    req.session.user = result;
    res.send("Login Success");
  });
});

// Logout User
app.get("/logout", (req, res) => {
  req.session.user = null;
  res.send("Logout Success");
});

// Delete User
app.delete("/deleteuser", (req, res) => {
  collection.remove({ _id: new ObjectId(req.body._id) }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User Deleted");
  });
});

// Update User
app.put("/updateuser", (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role ? req.body.role : "user",
    isActive: true,
  };
  collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: user },
    { upsert: true },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User Updated");
    }
  );
});

// Deactivate User || Soft Delete
app.put("/deactivateuser", (req, res) => {
  collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { isActive: false } },
    { upsert: true },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User Deactivated");
    }
  );
});

// Activate User
app.put("/activateuser", (req, res) => {
  collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { isActive: true } },
    { upsert: true },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User Activated");
    }
  );
});

const PORT = process.env.PORT || 3400;
app.listen(PORT, console.log("Server running on: " + PORT));
