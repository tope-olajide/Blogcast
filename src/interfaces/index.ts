import {Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
    id:any;
    user:any;
}