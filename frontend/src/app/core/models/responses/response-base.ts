import { IResponse } from "../../interfaces/iresponse";
import { ResponseCodes } from "../../enumerators/response-codes";

export abstract class ResponseBase implements IResponse {
    public CodeName: ResponseCodes = ResponseCodes.Unauthorized;
    public Message: string | null = null;
    public ErrorNumber: number | null = null;

    get CodeNumber(): number {
        return this.CodeName;
    }

    set CodeNumber(value: number) {
        this.CodeName = ResponseCodes[value] as unknown as ResponseCodes;
    }
}
