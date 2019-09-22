import { NotesService } from './notes.service';
export declare class NotesController {
    private notes;
    constructor(notes: NotesService);
    create(body: any): void;
    delete(body: any): void;
    createAll(body: any): void;
}
