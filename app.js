
import{app} from "./config.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js"

const auth = getAuth(app);
const database = getDatabase();
const storage = getStorage();

console.log("logging");

const signup = () => {
    let username = document.getElementById("username")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let image = document.getElementById("image")
    console.log(image.files[0]);
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((response) => {
            console.log("successfully Signup", response)
            window.location.href="./index.html"
            const imageFile = image.files[0];
            let mediaRef = storageRef(storage, "images/" + imageFile.name)
            uploadBytes(mediaRef, imageFile).then((response) => {
                console.log("successfully added image in storage", response.ref);
                getDownloadURL(response.ref).then((url)=>{
                    let uniqueId = auth.currentUser.uid
                    let userReference = ref(database, "users/" + uniqueId)
                    let userObj = {
                        name: username.value,
                        email: email.value,
                        password: password.value,
                        imageUrl: url
                    }
                    set(userReference, userObj).then((response) => {
                        console.log("Succesfully added data in database", response);
                    })
                })
            }).catch((reject)=>{
                console.log("err", reject);
            })

       
        }).catch((reject) => {
            alert(reject)
        })
}


let signup_btn = document.getElementById("signup-btn")
if(signup_btn){
signup_btn.addEventListener("click", signup)
}
else{
const login = () => {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((resolve) => {
            alert("successfully Login",resolve)
            window.location.href="./dashboard.html"
            let uniqueId = auth.currentUser.uid
            console.log(uniqueId);
            let userReference = ref(database, "users/" + uniqueId)

            onValue(userReference, (snapshot) => {
                console.log(snapshot.val());
                let username = document.getElementById("username")
                username.innerHTML = snapshot.val().name;

                let imageElement = document.getElementById("showimage")
                if(imageElement){
                imageElement.src = snapshot.val().imageUrl}
            })
        }).catch((reject) => {
            alert(reject)
        })
}


let login_btn = document.getElementById("login-btn")

login_btn.addEventListener("click", login)

}
