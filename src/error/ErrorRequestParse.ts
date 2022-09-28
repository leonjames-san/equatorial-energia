import { AxiosError } from "axios";
import { ClientError } from ".";
import { isObject } from "../util";

export class ErrorRequestParse {
    _message = "unknown message";

    constructor(error: AxiosError<{[key: string]: any}> | ClientError, specific_key = "error_description"){
        if(error instanceof ClientError){
            this._message = error.message;
            return;
        }

        if(error instanceof AxiosError){
            isObject(error.response?.data) && (this._message =  error.response?.data[specific_key]);
            return;
        }
    }

    getMessage(){
        return this._message;
    }
}
