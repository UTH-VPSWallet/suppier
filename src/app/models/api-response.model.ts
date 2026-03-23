import { HttpStatusCode } from "@angular/common/http";

export interface ApiResponse<T> {
  result: T | null;
  status?: HttpStatusCode;
  message?: string;
}
