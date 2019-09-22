import { Notes } from './notes.entity';
import { Repository } from 'typeorm';
export declare class NotesService {
    private readonly notesRepository;
    constructor(notesRepository: Repository<Notes>);
    findAllFromActiveUsers(): Promise<Notes>;
    findAll(): Promise<any>;
    postNote(note: any): Promise<import("typeorm/query-builder/result/InsertResult").InsertResult>;
    postNotes(notes: any): Promise<any>;
    deleteNote(note: any): Promise<import("typeorm/query-builder/result/DeleteResult").DeleteResult>;
}
