import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCbXK2pXTxeo_h1SNZJ7hHDBgT13oFhjj4',
	authDomain: 'clone-63766.firebaseapp.com',
	projectId: 'clone-63766',
	storageBucket: 'clone-63766.appspot.com',
	messagingSenderId: '460815579607',
	appId: '1:460815579607:web:cd9f10ba6b2dd0b7db3392',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
