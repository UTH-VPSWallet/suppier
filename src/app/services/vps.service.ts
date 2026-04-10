import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import { VPSCreateReq, VPSDeleteReq, VPSGetAllReq, VPSGetAllRes, VPSUpdateReq } from "../models/vps.model";
import { ApiService } from "./api.service";
import { Res, ResData } from "../models/res.dto";

@Injectable({ providedIn: 'root' })
export class VPSService extends ApiService {

    async GetAll(req: VPSGetAllReq): Promise<ResData<VPSGetAllRes[]>> {
        const url = API_ENDPOINTS.VPS.CONTROLLER + API_ENDPOINTS.VPS.GET_ALL;
        return await lastValueFrom(this.post<ResData<VPSGetAllRes[]>>(url, req));
    }
    async Add(req: VPSCreateReq): Promise<Res> {
        const url = API_ENDPOINTS.VPS.CONTROLLER + API_ENDPOINTS.VPS.ADD;
        return await lastValueFrom(this.post<Res>(url, req));
    }
    async Edit(req: VPSUpdateReq): Promise<Res> {
        const url = API_ENDPOINTS.VPS.CONTROLLER + API_ENDPOINTS.VPS.EDIT;
        return await lastValueFrom(this.post<Res>(url, req));
    }
    async Remove(req: VPSDeleteReq): Promise<Res> {
        const url = API_ENDPOINTS.VPS.CONTROLLER + API_ENDPOINTS.VPS.REMOVE;
        return await lastValueFrom(this.post<Res>(url, req));
    }
}
