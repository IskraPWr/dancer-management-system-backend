import { InstallmentService } from './installment.service';
export declare class InstallmentController {
    private installment;
    constructor(installment: InstallmentService);
    findAll(): Promise<object>;
    removeDate(message: any): Promise<any>;
    changeDate(message: any): Promise<object>;
    addDate(message: any): Promise<any>;
}
