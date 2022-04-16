import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCembWLppBEP1_kVnpWSxnAHieW3NGGHSY",
    authDomain: "my-money-6d42d.firebaseapp.com",
    projectId: "my-money-6d42d",
    storageBucket: "my-money-6d42d.appspot.com",
    messagingSenderId: "357800621261",
    appId: "1:357800621261:web:fa12b165804ef8ade2a584"
  };


  //init firebase
 firebase.initializeApp(firebaseConfig)

  //init service
  const projectFirestore=firebase.firestore()
  const projectAuth=firebase.auth()


  export {projectFirestore,projectAuth}