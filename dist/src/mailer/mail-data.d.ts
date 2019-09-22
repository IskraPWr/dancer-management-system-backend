import { IMailerData } from './../typings/typings.d';
import { TMail } from 'src/typings/typings';
export declare class Mail {
    constructor();
    sendMail(type: TMail, mailToRecipient: string, data?: IMailerData): Promise<any>;
}
