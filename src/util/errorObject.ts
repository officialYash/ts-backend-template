import { Request } from 'express';
import { THttpError } from '../types/types';
import responseMessage from '../constant/responseMessage';
import config from '../config/config';
import { EApplicationEnviroment } from '../constant/application';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error| unknown, req:Request, errorStatusCode:number=500) :THttpError=>{
const errorObject:THttpError={
    success:false,
    statusCode:errorStatusCode,
    request:{
        ip:req.ip || null,
        method:req.method,
        url:req.originalUrl
    },
    message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
    data:null,
    trace: err instanceof Error ? {error: err.stack} : null
}

//LOG
// eslint-disable-next-line no-console
console.error('CONTROLLER_Error',{
    meta:errorObject
})

if(config.ENV === EApplicationEnviroment.PRODUCTION)
    { delete errorObject.request.ip
        delete errorObject.trace
    }
    
return errorObject
}