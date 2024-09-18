import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { runChat } from "./indigo.js";
import { db } from "./firebase.js";

const app = express();

const port = 3000;

/* var data = [
    {
        id: uuidv4(),
        title: "Lab Report Proposal",
        details: "Deadline pushed back, look at the Assignment folder for details.",
        due: new Date(2024, 3, 9, 3, 24, 0),
        timeToComplete: 120,
        progress: 0.0,
    },
]; */

app.use(express.json());
app.use(cors());

app.get("/getData", async (req, res) => {
   const timeData = await getTimeData(req.query.userId);
   res.send(timeData);
});

app.post("/userOnboard", async (req, res) => {
   res.send(await addUser(req.body.userData));
});

// TODO: Update system instructions to accept and understand input format
app.get("/invokeIndigo", async (req, res) => {
   const timeData = req.query.timeData || (await getTimeData(req.query.userId));
   runChat({
      message: req.query.message,
      timeData: timeData,
   })
      .catch((error) => res.status(500).send(error))
      .then((result) => res.send(result.response.text()));
});

// OLD

app.get("/getItem", (req, res) => {
   const { index, a, b } = req.query;
   console.log(req.query);
   res.send(data[index]);
});

app.post("/addItem", (req, res) => {
   const { title, details, due, timeToComplete, progress } = req.body;
   let index = data.length;
   data = [...data, { id: uuidv4(), title: title, details: details, due: new Date(due), timeToComplete: timeToComplete, progress: progress || 0.0 }];
   res.send(data[index]);
});

app.post("/updateItem", (req, res) => {
   console.log("before:", req.body);
   const { id, title, details, due, timeToComplete, progress } = req.body;
   let index = data.findIndex((item) => item.id == id);
   data[index] = req.body;
   console.log("after:", data[index]);
   res.send(req.body);
});

// Helper functions

const addUser = async (userData) => {
   const userRef = await db.collection("users").add({
      email: userData.email,
      name: userData.name,
   });
   return userRef.id;
};

const getUserData = async (userId) => {
   const userRef = db.collection("users").doc(userId);
   const dataRef = await userRef.get();
   return dataRef.data();
};

const getTimeData = async (userId) => {
   const userRef = db.collection("users").doc(userId);
   const dataRef = await userRef.collection("time_data").get();
   return dataRef.docs.map((td) => td.data());
};

const addItem = async (userId, item) => {
   const userRef = db.collection("users").doc(userId);
   const itemRef = await userRef.collection("time_data").add(item);
};

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});
