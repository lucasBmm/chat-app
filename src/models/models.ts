export interface Error {
    hasError: true | false,
    errorMessage: string
}

export interface ILogin {
    displayName: string,
    email: string,
    password: string,
    userImage: File | null
}