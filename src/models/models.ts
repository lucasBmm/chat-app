export interface Error {
    hasError: true | false,
    errorMessage: string
}

export interface IRegister{
    displayName: string,
    email: string,
    password: string,
    userImage: any
}

export interface ILogin {
    email: string,
    password: string,
}

export interface IChat {
    chatId: string,
    user: IUser | null
}

export interface IChats {
    date: {
        seconds: number,
        nanoseconds: number
    },
    userInfo: {
        displayName: string,
        uid: string,
        photoURL: string
    },
    lastMessage?: any
}

export interface IUser {
    displayName: string,
    photoURL: string,
    uid: string
}