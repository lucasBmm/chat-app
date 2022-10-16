export interface Error {
    hasError: true | false,
    errorMessage: string
}

export interface IRegister{
    displayName: string,
    email: string,
    password: string,
    userImage: File | null
}

export interface ILogin {
    email: string,
    password: string,
}

export interface IChat {
    chatId: string,
    user: IUser | null
}

export interface IUser {
    displayName: string,
    photoURL: string,
    uid: string
}