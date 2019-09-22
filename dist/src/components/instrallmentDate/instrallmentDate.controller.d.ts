import { InstallmentDateService } from './instrallmentDate.service';
export declare class InstallmentDateController {
    private installmentDate;
    constructor(installmentDate: InstallmentDateService);
    findAll(): Promise<object>;
    getAllHeaders(): Promise<object>;
    getAllSemestersDetails(): Promise<object>;
    changeDate(message: any): Promise<object>;
    addDate(message: any): Promise<any>;
    removeDate(message: any): Promise<any>;
}
