export interface ILogin {
    access_token: string,
    token_exp_time: string,
    admin: {
        id: number,
        username: string,
        email: string
    }
}