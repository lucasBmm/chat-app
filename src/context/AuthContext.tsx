import { FirebaseApp } from "firebase/app";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "../firebase";
import ReactLoading from 'react-loading';
import { Loading } from "../components/Loading";


export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [pending, setPending] = useState(true);

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (!user) { 
          setPending(false); 
          return;
        }
        
        setCurrentUser(user);
        setPending(false)
      });

      return () => {
        unsub();
      };
    }, []);

    if (pending) {
      return <Loading />
    }

    return (
        <AuthContext.Provider value={currentUser ?? null} >
            {children}
        </AuthContext.Provider>
    )
}