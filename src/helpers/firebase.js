// Module imports
import firebase from 'firebase/app'
/* eslint-disable import/no-unassigned-import */
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
/* eslint-enable import/no-unassigned-import */





// Local imports
import { firebaseConfig } from 'firebase.config'





let auth = null
let database = null
let firestore = null

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  auth = firebase.auth()
  database = firebase.database()
  firestore = firebase.firestore()
}





export {
  auth,
  database,
  firebase,
  firestore,
}
