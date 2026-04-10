import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import { VPSGetAllReq, VPSGetAllRes } from "../models/vps.model";
import { ApiService } from "./api.service";
import { ResData } from "../models/res.dto";

@Injectable({ providedIn: 'root' })
export class VPSService extends ApiService {

    async GetAll(req: VPSGetAllReq): Promise<ResData<VPSGetAllRes[]>> {
        const url = API_ENDPOINTS.VPS.CONTROLLER + API_ENDPOINTS.VPS.GET_ALL;
        return await lastValueFrom(this.post<ResData<VPSGetAllRes[]>>(url, req));
    }
}
