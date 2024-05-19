import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../config/environment.prod';
import { ResponseObject } from '../models/responses/response-object';
import { ResponseEmpty } from '../models/responses/response-empty';
import { ResponseCodes } from '../enumerators/response-codes';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private IsDevMode: boolean = false;

  constructor(private http: HttpClient) {
    this.IsDevMode = isDevMode();
  }

  private GetUrl(url: string): string {
    let apiUrl = environment.apiUrl;
    if (apiUrl.endsWith("/")) apiUrl = apiUrl.substring(0, apiUrl.length - 1);
    return `${apiUrl}/${url}`;
  }

  public async Post<result>(url: string, data: any): Promise<ResponseObject<result>> {
    try {
      const response = await lastValueFrom(this.http.post<ResponseObject<result>>(this.GetUrl(url), data));
      return response;
    }
    catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.onError(error);
    }
  }

  public GetBadGatewayResponse(): ResponseEmpty {
    const result = new ResponseEmpty();
    result.CodeName = ResponseCodes.BadGateway;
    result.Message = "Ha ocurrido un error de comunicación, favor de verificar su conexión a internet.";
    result.ErrorNumber = 0;
    return result;
  }

  public onError(error: any): any {
    if (this.IsDevMode) {
      console.error(error);
    }
    return this.GetBadGatewayResponse();
  }
}
