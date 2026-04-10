export interface VPSGetAllReq {
    Email: string;
}
export interface VPSGetAllRes {
    ID: number;
    Name: string;
    CPU :string;
    RAM :string;
    Storage :string;
    PricePerMonth: number;
    Status: number;
}
export interface VPSCreateReq {
    ID: number;
    Name: string;
    CPU :string;
    RAM :string;
    Storage :string;
    PricePerMonth: number;
    Status: number;
    Email: string;
}
export interface VPSUpdateReq {
    ID: number;
    Name: string;
    CPU :string;
    RAM :string;
    Storage :string;
    PricePerMonth: number;
    Status: number;
}