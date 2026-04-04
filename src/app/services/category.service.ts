import { HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import { GetBySupplierRes } from "../models/category.model";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class CategoryService extends ApiService {

    async GetAll(req: string) {
        const url = API_ENDPOINTS.SUPPLIER.CONTROLLER + API_ENDPOINTS.SUPPLIER.LOGIN;
        try {
            const resData = await lastValueFrom(this.post<GetBySupplierRes>(url, req));
            if (resData && resData.status === HttpStatusCode.Ok) {
                if(resData.result) return resData;
            }
            return null;
        }
        catch (err) { return err }
    }
}
