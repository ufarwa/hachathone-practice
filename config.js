
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
  
const firebaseConfig = {
    apiKey: "AIzaSyDIRDqvAFGLDDq1rn8O2Kbtzz0IXHhzgec",
    authDomain: "fir-practice-4f212.firebaseapp.com",
    databaseURL: "https://fir-practice-4f212-default-rtdb.firebaseio.com",
    projectId: "fir-practice-4f212",
    storageBucket: "fir-practice-4f212.appspot.com",
    messagingSenderId: "821567308477",
    appId: "1:821567308477:web:b0e775d529fcaf613dadd4",
    measurementId: "G-R0WYG9JCVN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export{app}