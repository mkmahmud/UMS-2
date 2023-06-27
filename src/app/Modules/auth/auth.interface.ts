export type ILogin = {
    id: string,
    password:string
}

export type IAuthResponse = {
    accessTOcken:string,
    refreshTOcken: string,
    needsPasswordChange: boolean | undefined
}