import { FirebaseApp } from "firebase/app";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);

    useEffect(() => {
       const unsub = onAuthStateChanged(auth, (user) => {
            if (user != null) setCurrentUser(user)
            console.log(user)
        });

        return () => {
            unsub();
        }
    }, [])

    return (
        <AuthContext.Provider value={currentUser} >
            {children}
        </AuthContext.Provider>
    )
}