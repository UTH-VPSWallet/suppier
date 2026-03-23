export interface LoginReq {
    email: string;
    pass: string;
}
export interface LoginRes {
    name: string;
    token: string;
}