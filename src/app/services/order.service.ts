import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import { VPSCreateReq, VPSDeleteReq, VPSGetAllReq, VPSGetAllRes, VPSUpdateReq } from "../models/vps.model";
import { ApiService } from "./api.service";
import { Res, ResData } from "../models/res.model";
import { GetOrderBySupplierReq, GetOrderBySupplierRes, OrderUpdateStatusReq } from "../models/order.model";

@Injectable({ providedIn: 'root' })
export class OrderService extends ApiService {

    async GetAll(req: GetOrderBySupplierReq): Promise<ResData<GetOrderBySupplierRes[]>> {
        const url = API_ENDPOINTS.ORDER.CONTROLLER + API_ENDPOINTS.ORDER.GET_ALL;
        return await lastValueFrom(this.post<ResData<GetOrderBySupplierRes[]>>(url, req));
    }
    async Add(req: VPSCreateReq): Promise<Res> {
        const url = API_ENDPOINTS.ORDER.CONTROLLER + API_ENDPOINTS.ORDER.ADD;
        return await lastValueFrom(this.post<Res>(url, req));
    }
    async Edit(req: OrderUpdateStatusReq): Promise<Res> {
        const url = API_ENDPOINTS.ORDER.CONTROLLER + API_ENDPOINTS.ORDER.UPDATE_STATUS;
        return await lastValueFrom(this.post<Res>(url, req));
    }
}
