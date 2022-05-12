import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

import config from './config'

const app = initializeApp(config.firebase)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
