
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
export const AuthContex = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [user,setUSer] = useState(null)
    const [loading,setLoading] = useState(true)


    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUser = (name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL : photo
        })
    }

    const logIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }




    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUSer(currentUser)
            console.log('current',currentUser)
            setLoading(false)
        })
        return ()=>{
            return unsubscribe()
        }
    },[])

    const authInfo = {user,createUser,updateUser,logOut,logIn}

    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>

    );
    
};

export default AuthProvider;