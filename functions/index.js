const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors")({origin: true});
admin.initializeApp();
const app = express();
app.use(cors);

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
/*
exports.addNewItem = functions.https.onRequest(async (request, response) => {
  if (request.method === 'POST') {
    const data = request.body;
    const db = admin.database();
    const ref = db.ref('users');

    const snapshot = await ref.once('value');
    const length = snapshot.numChildren();

    const newItemId = length + 1;

    ref.child(newItemId.toString()).set(data);

    response.status(201).send('Элемент успешно добавлен с ID: ' + newItemId);
  } else {
    response.status(405).send('Метод не поддерживается');
  }
});
*/
/*
exports.addUser = functions.https.onCall(async (data, context) => {
  try {
    const { id, data: userData } = data;

    console.log(data);

    if (!id || !userData) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Bad Request: Missing ID or Data"
      );
    }

    const usersRef = admin.database().ref("/users");

    await usersRef.child(`${id}`).set(userData);

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Content-Type": "application/json",
    };

    return {
      result: "User added successfully",
      headers,
    };
  } catch (error) {
    console.error("Error adding order:", error);
    throw new functions.https.HttpsError("internal", "Internal Server Error");
  }
});
*/
/*
app.post('/newUser', async (req, res) => {
  try {
    const { id, data: userData } = req.body;

    //console.log(req.body);

    if (!id || !userData) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Bad Request: Missing ID or Data'
      );
    }

    const usersRef = admin.database().ref('/users');

    await usersRef.child(`${id}`).set(userData);

   // res.status(200).json({ result: 'User added successfully' });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт функции
exports.newUser = functions.https.onRequest(app);
*/

exports.newUserAdd = functions.https.onCall(async (data, context) => {
  try {
    // const { id, data: userData } = data;

    if (!data) {
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Bad Request: Missing ID or Data",
      );
    }

    const usersRef = admin.database().ref("/users");

    const numUsers = (await usersRef.once("value")).numChildren();

    const id = numUsers + 1;

    const userData = {
      ...data,
      id,
    };

    await usersRef.child(`user${id}`).set(userData);

    return {success: true};
  } catch (error) {
    console.error("Error adding order:", error);
    throw new functions.https.HttpsError("internal", "Internal Server Error");
  }
});

exports.getUserByEmail = functions.https.onCall(async (email) => {
  if (!email) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Bad Request: Missing ID or Data",
    );
  }

  const usersRef = admin.database().ref("/users");

  const snapshot = await usersRef
      .orderByChild("email")
      .equalTo(email)
      .once("value");

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new functions.https.HttpsError("internal", "Internal Server Error");
  }
});
