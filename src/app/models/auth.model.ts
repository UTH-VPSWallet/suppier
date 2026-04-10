export interface LoginReq {
    Email: string;
    Pass: string;
}
export interface LoginRes {
    Name: string;
    Token: string;
}
export interface LoginStorage {
    Email: string;
    Name: string;
    Token: string;
}