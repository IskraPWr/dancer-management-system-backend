import { IMailerData } from './../typings/typings.d';
import { TMail } from '../typings/typings';
export declare class Mail {
    constructor();
    sendMail(type: TMail, mailToRecipient: string, data?: IMailerData): Promise<any>;
}
