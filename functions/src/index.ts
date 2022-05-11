import functions = require('firebase-functions')
import admin = require('firebase-admin')

admin.initializeApp()

const firestore = admin.firestore()

exports.scheduledFunction = functions.pubsub
    .schedule('every 10 minutes')
    .onRun(async () => {
        const users = firestore.collection('users')
        const snapshot = await users.get()
        snapshot.forEach(async (user) => {
            const document = firestore.doc(`users/${user.id}`)
            const data = user.data()
            if (admin.firestore.Timestamp.now() > data.story.expiresAt) {
                await document.update({
                    story: admin.firestore.FieldValue.delete(),
                })
            }
        })

        return null
    })
