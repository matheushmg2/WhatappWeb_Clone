import firebase from "firebase";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


export class Firebase {

    constructor() {

        this._initialized = false;

        this._config = {
            apiKey: "AIzaSyDjD67KljgNACCYfxGH5J3x15LVKfgusGo",
            authDomain: "whatapp-clone-9300f.firebaseapp.com",
            databaseURL: "https://whatapp-clone-9300f-default-rtdb.firebaseio.com",
            projectId: "whatapp-clone-9300f",
            storageBucket: "gs://whatapp-clone-9300f.appspot.com",
            messagingSenderId: "671790743359",
            appId: "1:671790743359:web:171337deb3ceae48f31d8a"
        }

        this.init();

    }

    init(){
        // Initialize Firebase
        //console.log('Firebase init(): !this._initialized', this._initialized);
        if (!window._initializedFirebase) {
            //console.log('Firebase init(): !this._initialized>firebase', firebase);
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            window._initializedFirebase = true;
        }
    }
 
    static db() {
        return firebase.firestore();
    }
 
    static hd() {
        return firebase.storage();
    }

    initAuth(){
        return new Promise((s,f)=> {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result=>{
                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });

            }).catch(err=>{
                f(err);
            })
        })
    }

}