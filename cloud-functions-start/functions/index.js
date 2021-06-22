/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { event } = require("firebase-functions/lib/providers/analytics");
admin.initializeApp();

// TODO(DEVELOPER): Import the Cloud Functions for Firebase and the Firebase Admin modules here.

// TODO(DEVELOPER): Write the addWelcomeMessages Function here.

// TODO(DEVELOPER): Write the blurOffensiveImages Function here.

// TODO(DEVELOPER): Write the sendNotifications Function here.
// exports.sendNotifications = functions.firestore.document('/messages/{messageId}').onWrite((event) => {
//     const data= event.data;
//     console.log("Message received");
//     console.log(data);
//     const payload = {
//         notification: {
//             title: "Reminder",
//             body: "Tuma updates kijanaa"
//         }
//     };
//     return admin.messaging().sendToTopic("ed_message_topic", payload);
exports.sendNotifications = functions.firestore
  .document('/messages/{messageId}')
  .onCreate(async (snapshot) => {
      console.log("Message received");
      console.log(snapshot.data());
    const payload = {
      notification: {
        title: snapshot.data().title,
        body: snapshot.data().message,
      },
    };
    await admin
      .messaging()
      .sendToTopic("ed_message_topic", payload)
      .then(function (response) {
        console.log("Notification sent successfully:", response);
      })
      .catch(function (error) {
        console.log("Notification sent failed:", error);
      });
  });
