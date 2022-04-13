import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import config from './config'

const Firebase = initializeApp(config.firebase)
export const db = getFirestore(Firebase)

export default Firebase
