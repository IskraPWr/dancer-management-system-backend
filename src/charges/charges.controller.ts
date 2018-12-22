import { ListService } from './../list/list.service';
import { UsersService } from './../users/users.service';
import { NotesService } from './../notes/notes.service';
import { Get, Header, Controller } from '@nestjs/common';

@Controller('charges')
export class ChargesController {
  constructor(private users: UsersService, private notes: NotesService, private list: ListService) {
  }

    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(){
      return Promise.all([
        this.users.findAllActive(),
        this.notes.findAll(),
        this.list.findAll(),
    ]).then(value => {
        const data = [];
        const usersQuantity = Object.keys(value[0]).length;
        const notesQuantity = Object.keys(value[1]).length;
        const listQuantity = Object.keys(value[2]).length;

        /*for ( let i = 0; i < usersQuantity; i++) {
            const obj = {
                name : value[0][i].name,
                surname : value[0][i].surname,
                declaration : value[0][i].declaration,
                entryFee: ,
                payment1 : ,
                payment2 :,
                payment3 :
                sum : ,
                notes : [],
            };
            for (let j = lastNoteId; j < notesQuantity; j++) {
                if (value[0][i].id_user === value[1][j].id_user){
                    obj.notes.push(value[1][j].note);
                }
                if (value[0][i].id_user < value[1][j].id_user){
                    lastNoteId = j;
                    break;
                }
            }
            data.push(obj);
        }*/
        return data;
    });

    }
}
