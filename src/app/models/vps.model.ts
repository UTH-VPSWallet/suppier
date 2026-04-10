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
    Name: string;
    CPU :string;
    RAM :string;
    Storage :string;
    PricePerMonth: number;
    Status: number;
    Email: string;
}

