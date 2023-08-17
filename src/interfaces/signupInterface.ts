export interface ISignupAPIResponse {
    message: string,
    data: {
        name: string,
        _id: string,
        batch: string,
        email: string,
        isAdmin: boolean,
        isApproved: boolean,
        password: string,
    },
    jsonToken: string,
}
