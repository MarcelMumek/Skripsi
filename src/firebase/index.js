import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAnfnqGE_WoGN6hw1IoDxIVgWOMjHJLnC0",
    authDomain: "skripsi-uk1.firebaseapp.com",
    databaseURL: "https://skripsi-uk1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "skripsi-uk1",
    storageBucket: "skripsi-uk1.appspot.com",
    messagingSenderId: "755513414947",
    appId: "1:755513414947:web:0bf0ce06fc758e6430a896",
    measurementId: "G-CDJX1X50ZW"
}

const app = initializeApp(firebaseConfig)

export default app