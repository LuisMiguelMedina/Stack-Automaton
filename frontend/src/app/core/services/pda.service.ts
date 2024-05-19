import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseObject } from '../models/responses/response-object';

@Injectable({
  providedIn: 'root'
})
export class SimulatePdaService {
  constructor(private api: ApiService) { }

  public simulatePDA(string: string): Promise<any> {
    return this.api.Post<any>("simulate", { string });
  }
}
