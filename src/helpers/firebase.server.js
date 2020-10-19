// Module imports
import * as firebaseAdmin from 'firebase-admin'





// Local variables
let app = null





if (!firebaseAdmin.apps.length) {
	app = firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
			auth_uri: process.env.FIREBASE_AUTH_URI,
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
			client_id: process.env.FIREBASE_CLIENT_ID,
			client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
			private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
			private_key: process.env.FIREBASE_PRIVATE_KEY,
			project_id: process.env.FIREBASE_PROJECT_ID,
			token_uri: process.env.FIREBASE_TOKEN_URI,
			type: process.env.FIREBASE_TYPE,
		}),
		databaseURL: process.env.FIREBASE_DATABASE_URL,
	})
}





export const firebase = firebaseAdmin.apps[0]
export const auth = firebaseAdmin.apps[0]?.auth()
export const database = firebaseAdmin.apps[0]?.database()
export const firestore = firebaseAdmin.apps[0]?.firestore()
export { firebaseAdmin }
