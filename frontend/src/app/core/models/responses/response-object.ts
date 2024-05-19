import { ResponseBase } from "./response-base";
import { ResponseEmpty } from "./response-empty";

export class ResponseObject<T> extends ResponseBase {
    public Result: T | null = null;

    public ToResponseEmpty(): ResponseEmpty {
        const result = new ResponseEmpty();
        result.CodeName = this.CodeName;
        result.ErrorNumber = this.ErrorNumber;
        result.Message = this.Message;
        return result;
    }
}
