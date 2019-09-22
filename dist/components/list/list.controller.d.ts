import { ListService } from './list.service';
export declare class ListController {
    private db;
    constructor(db: ListService);
    findAll(): Promise<object>;
}
