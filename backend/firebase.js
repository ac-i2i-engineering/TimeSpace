import admin from "firebase-admin";
import serviceAccount from "./timespace-cb201-firebase-adminsdk-ijohd-52d950ee6b.json" with { type: "json" };

//setup interaction with Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { admin, db };