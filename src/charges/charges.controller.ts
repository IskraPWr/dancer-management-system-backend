import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { ListService } from './../list/list.service';
import { UsersService } from './../users/users.service';
import { NotesService } from './../notes/notes.service';
import { Get, Header, Controller, Param } from '@nestjs/common';

@Controller('charges')
export class ChargesController {
  constructor(private users: UsersService, private notes: NotesService, private list: ListService, private semester: InstallmentDateService) {
  }

    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(){
      return Promise.all([
        this.users.findAllActive(),
        this.notes.findAll(),
        this.list.findAll(),
        this.semester.findAll(),
    ]).then(value => {
        const data = [];
        const usersQuantity = Object.keys(value[0]).length;
        const notesQuantity = Object.keys(value[1]).length;
        const listQuantity = Object.keys(value[2]).length;
        const semesterQuantity =  Object.keys(value[3]).length;
        let lastNoteId = 0;

        for (let k = 0; k < semesterQuantity; k++) {
            let bufor;
            let currenIterator = 0;
            const seme = {
                id_semester : value[3][k].id_semester,
                data : [],
            };
            for ( let i = 0; i < usersQuantity; i++) {
                const tab = [0, 0, 0, 0];
                for (let m = currenIterator; m < listQuantity; m++ ) {
                    if (new Date(value[2][m].date) > value[3][k].start && new Date(value[2][m].date) <= value[3][k].end &&
                    value[0][i].email === value[2][m].email ){
                        if (value[2][m].product.includes('Składka Członkowska  SKTT PWr dla nowych członków')){
                            tab[0] = tab[0] + value[2][m].sum;
                        }else if (new Date(value[2][m].date) > value[3][k].start &&  new Date(value[2][m].date) <= value[3][k].date_1) {
                            tab[1] = tab[1] + value[2][m].sum;
                        }else if (new Date(value[2][m].date) > value[3][k].date_1 &&  new Date(value[2][m].date) <= value[3][k].date_2) {
                            tab[2] = tab[2] + value[2][m].sum;
                        }else if (new Date(value[2][m].date) > value[3][k].date_2 &&  new Date(value[2][m].date) <= value[3][k].end) {
                            tab[3] = tab[3] + value[2][m].sum;
                        }
                    }else if (new Date(value[2][m].date) < value[3][k].start) {
                        bufor = m;
                    }
                }
                const obj = {
                    id : value[0][i].id_user,
                    name : value[0][i].name,
                    surname : value[0][i].surname,
                    declaration : value[0][i].declaration,
                    entryFee: tab[0],
                    payment1 : tab[1],
                    payment2 : tab[2],
                    payment3 : tab[3],
                    sum : (tab[1] + tab[2] + tab[3]),
                    notes : [],
                };
                for (let j = lastNoteId; j < notesQuantity; j++) {
                    if (value[0][i].id_user === value[1][j].id_user){
                        obj.notes.push(value[1][j].note);
                    } else {
                        lastNoteId = j;
                        break;
                    }
                }
                seme.data.push(obj);
            }
            lastNoteId = 0;
            currenIterator = bufor;
            data.push(seme);
        }
        return data;
    });
    }

    @Get(':id')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    find(@Param('id') id) {
        let records;
        let user;

        return Promise.resolve(this.users.findOneAll(id)).then(value => {
            user = value;
            return this.list.findByEmail(value.email);
        }).then(value => {
            if (value === null){
                return null;
            }
            records = value;
            return this.semester.findAll();
        }).then(value => {
            if (value === null){
                return null;
            }
            const tab = [0, 0, 0, 0];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < Object.keys(records).length; i++){
                if (new Date(records[i].date) > value[0].start && new Date(records[i].date) <= value[0].end){
                    if (records[i].product.includes('Składka Członkowska  SKTT PWr dla nowych członków')){
                        tab[0] = tab[0] + records[i].sum;
                    }else if (new Date(records[i].date) > value[0].start &&  new Date(records[i].date) <= value[0].date_1) {
                        tab[1] = tab[1] + records[i].sum;
                    }else if (new Date(records[i].date) > value[0].date_1 &&  new Date(records[i].date) <= value[0].date_2) {
                        tab[2] = tab[2] + records[i].sum;
                    }else if (new Date(records[i].date) > value[0].date_2 &&  new Date(records[i].date) <= value[0].end) {
                        tab[3] = tab[3] + records[i].sum;
                    }
                }
            }
            return {
                semester: value[0],
                data: {
                    entryFee: tab[0],
                    charges1: tab[1],
                    charges2: tab[2],
                    charges3: tab[3],
                    declaration: user.declaration,
                },
            };
        });
    }
}
