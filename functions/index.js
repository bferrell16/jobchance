const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addCompany = functions.https.onCall(async (data, context) => {
  db.collection("companies").add({
    Name: data.companyName,
    jobs: {},
  });
});

exports.addJob = functions.https.onCall(async (data, context) => {
  const docRef = await db.collection("jobs").add({
    company: data.companyName,
    title: data.jobTitle,
    link: data.jobLink,
    data: [],
  });
  db.collection("companies")
    .doc(data.companyKey)
    .update({
      ["jobs." + data.jobTitle]: docRef.id,
    });
});

exports.addJobData = functions.https.onCall(async (data, context) => {
  db.collection("jobs")
    .doc(data.jobKey)
    .update({
      data: admin.firestore.FieldValue.arrayUnion(
        {
          experience: data.experience,
          gpa: data.gpa,
          school: data.school,
          outcome: data.outcome,
          classYear: data.classYear,
          numExperience: data.numExperience,
        }
      )
    });
});
