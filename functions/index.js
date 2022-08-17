const functions = require('firebase-functions');

const express = require('express');
const cors = reqire('require');

const stripe = require('stripe')('sk_test_51LXh1YLGRwLIVinmRAmzkncA4keF9TQXhiHyVBPOd0e3N5NsTDoICAh0Q2bhWxzQuhpeo6DsebVFloqcwDZHJmTP00G8d0woRV');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get('/', (request, response) => response.status(200).send('Hello From Cloud'));
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
