import { FirebaseApp } from "firebase/app";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { IChat, IUser } from "../models/models";
import { AuthContext } from './AuthContext';

export const ChatContext = createContext<any | null>(null);

export const ChatContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const currentUser = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: "",
        user: null
   }

   const chatReducer = (state: IChat, action: { type: string, payload: IUser}) => {
        switch(action.type) {
            case "CHANGE_USER":
                if (!currentUser) return;
                return {
                    user: action.payload,
                    chatId: 
                        currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                };

            default:
                return state;
        }
   }

   const [ state, dispatch ] = useReducer<any>(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch: dispatch}} >
            {children}
        </ChatContext.Provider>
    )
}