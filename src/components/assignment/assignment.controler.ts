import { NotesService } from './../notes/notes.service';
import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { GroupService } from './../group/group.service';
import { Get, Header, Controller } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('assignments')
export class AssignmentspController {
  constructor(private group: GroupService, private semesters: InstallmentDateService, private users: UsersService, private notes: NotesService) {
  }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    findAllWithAssignments(){
       return Promise.all([
            this.users.findAllActive(),
            this.notes.findAll(),
            this.group.findAllAssignment()
        ]).then(value => {
            //console.log(value);
            const data = [];
            const usersQuantity = Object.keys(value[0]).length;
            const notesQuantity = Object.keys(value[1]).length;
            const assignmentQuantity = Object.keys(value[2]).length;
            let lastNoteId = 0;
            let lastAssigmentId = 0;

            for ( let i = 0; i < usersQuantity; i++) {
                const obj = {
                    id : value[0][i].id_user,
                    name : value[0][i].name,
                    surname : value[0][i].surname,
                    gender : value[0][i].gender,
                    email : value[0][i].email,
                    phone: value[0][i].phone,
                    university : value[0][i].university,
                    department : value[0][i].department,
                    year : value[0][i].year,
                    index : value[0][i].index,
                    notes : [],
                    assignments: [],
                };
                for (let j = lastNoteId; j < notesQuantity; j++) {
                    if (value[0][i].id_user === value[1][j].id_user){
                        obj.notes.push({name: value[1][j].note});
                    }
                    if (value[0][i].id_user < value[1][j].id_user){
                        lastNoteId = j;
                        break;
                    }
                }
                for (let k = lastAssigmentId; k < assignmentQuantity; k++) {
                    if (value[0][i].id_user === value[2][k]['id_user']){
                        const object = value[2][k];
                        delete object.id;
                        obj.assignments.push(object);
                    }
                    if (value[0][i].id_user < value[2][k]['id_user']){
                        lastAssigmentId = k;
                        break;
                    }
                }
                data.push(obj);
            }
            return data;
        });

    }
}