import { List } from './../list/list.entity';
import { Repository } from 'typeorm';
export declare class ListService {
    private readonly listRepository;
    constructor(listRepository: Repository<List>);
    findAll(): Promise<List[]>;
    findAllActive(): Promise<List[]>;
    findByEmail(mail: any): Promise<List[]>;
    findByName(nam: any): Promise<List>;
    findById(id: any): Promise<List>;
}
