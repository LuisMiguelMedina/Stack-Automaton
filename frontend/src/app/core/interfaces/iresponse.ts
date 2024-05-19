import { ResponseCodes } from "../enumerators/response-codes";

export interface IResponse {
    CodeName: ResponseCodes;
    CodeNumber: number | null;
    Message: string | null;
    ErrorNumber: number | null;
}
