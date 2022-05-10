import functions = require('firebase-functions')

import admin = require('firebase-admin')

admin.initializeApp()
const database = admin.firestore()
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.scheduledFunction = functions.pubsub
    .schedule('every 30 minutes')
    .onRun((context) => {
        const users = database.collection('users')
        console.log(users)

        // if(admin.firestore.Timestamp.now() > )

        return null
    })
