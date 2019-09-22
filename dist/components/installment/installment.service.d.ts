import { Installments } from './installment.entity';
import { Repository } from 'typeorm';
export declare class InstallmentService {
    private readonly installmentsRepository;
    constructor(installmentsRepository: Repository<Installments>);
    findAll(): Promise<Installments[]>;
    findType0(): Promise<Installments[]>;
    findType1(): Promise<Installments[]>;
    removeDate(idArray: any): Promise<any>;
    changeDate(message: any): Promise<import("typeorm/query-builder/result/UpdateResult").UpdateResult>;
    addDate(message: any): Promise<void>;
}
