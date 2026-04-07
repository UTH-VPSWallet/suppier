export interface LoginReq {
    Email: string;
    Pass: string;
}
export interface LoginRes {
    name: string;
    token: string;
}