export interface ChangePassReq { 
    Email: string;
    Pass: string;
    PassNew: string;
}
export interface ForgotPassReq { 
    Email: string,
    Phone: string
}
export interface ForgotPassRes { 
    NewPass: string,
}