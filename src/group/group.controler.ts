import { NotesService } from './../notes/notes.service';
import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { ParseIntPipe } from './../pipes/parse-int.pipe';
import { GroupService } from './group.service';
import { Get, Header, Param, Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PresenceService } from 'src/presence/presence.service';

@Controller('groups')
export class GroupController {
  constructor(private group: GroupService, private semesters: InstallmentDateService, private notes: NotesService, private presence: PresenceService) {
  }

    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Promise<Array<object>> {
     return Promise.all([
        this.group.findAll(),
        this.semesters.findAll()])
        .then(([groups, semeters]) => {
        const semestersQuantity = Object.keys(semeters).length;
        const groupsQuantity = Object.keys(groups).length;

        let idSemester;
        const data = [];
        let semesterData = [];

        function setSemester() {
            const semester = {
                id_semester: idSemester,
                data : semesterData,
            };
            data.push(semester);
        }

        for (let i = 0; i < semestersQuantity; i++ ){
            idSemester = semeters[i].id_semester;
            for (let j = 0; j < groupsQuantity; j++) {
                if (groups[j].id_semester === idSemester){
                    const obj = {
                        id : groups[j].id,
                        name : groups[j].name,
                        day: groups[j].day,
                        start:  groups[j].start,
                        end: groups[j].end,
                    };
                    semesterData.push(obj);
                }
            }
            setSemester();
            semesterData = [];
        }
        return data;
     });
    }

    @Get(':id')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findOne(@Param('id') id): Promise<Array<object>> {
     return this.group.findAllHeadersBySemesterId(id);
    }

    @Get('findbyidgroup/:id')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findUsers(@Param('id') id): Promise<Array<object>> {
    return Promise.all([
        this.group.findAllUsersByIdGroup(id),
        this.notes.findAll(),
        this.presence.findAllPresenceInGroupByIdGroup(id),
        this.semesters.findSemesterByIdGroup(id),
        this.group.findGroupById(id),
    ]).then(value => {
        const data = [];
        const usersQuantity = Object.keys(value[0]).length;
        const notesQuantity = Object.keys(value[1]).length;
        const presenceQuantity = Object.keys(value[2]).length;
        let lastNoteId = 0;
        let lastPresenceId = 0;

        const containerWithDates = [];
        let currentDay = value[3][0]['start'];

        const namesOfMonths = [
            'Stycznień',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Październik',
            'Listopad',
            'Grudzień'
        ]

        while(currentDay.getDay() !== value[4][0]['day']){
            currentDay = new Date(currentDay.valueOf() + 1000*60*60*24);
        }

        while(currentDay < value[3][0]['end']){
            containerWithDates.push(currentDay);
            currentDay = new Date(currentDay.valueOf() + 1000*60*60*24*7);
        }

        for ( let i = 0; i < usersQuantity; i++) {
            const obj = {
                id : value[0][i]['id_user'],
                name : value[0][i].name,
                surname : value[0][i]['surname'],
                gender: value[0][i]['gender'],
                notes : [],
                presences : [],
            };
            for (let j = lastNoteId; j < notesQuantity; j++) {
                if (value[0][i]['id_user'] === value[1][j].id_user){
                    obj.notes.push(value[1][j].note);
                } else if (value[0][i]['id_user'] < value[1][j].id_user){
                    lastNoteId = j;
                    break;
                }
            }

            const objPresence = [];
            for(let m = 0; m < containerWithDates.length; m++){
                  objPresence.push({
                        date: containerWithDates[m].getDate() + ' ' + namesOfMonths[containerWithDates[m].getMonth()],
                        value: null,
                    })
            }

            for (let j = lastPresenceId; j < presenceQuantity; j++) {
                if (value[0][i]['id_user'] === value[2][j].id_user){

                    for(let k = 0; k < objPresence.length; k++){
                        if(value[2][j].time.getDate() === containerWithDates[k].getDate()){
                            objPresence[k].value = '|';
                            break;
                        }
                    }
                }
            }
            obj.presences = objPresence;
            data.push(obj);
        }
        return data;
    });
    }

    @Post('remove')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    removeDate(@Body() message): Promise<any> {
      return this.group.removeDate(message);
    }

    @Post('change')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    changeDate(@Body() message): Promise<object> {
      return this.group.changeDate(message);
    }

    @Post('add')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    addDate(@Body() message): Promise<any> {
      return this.group.addDate(message);
    }
}

@Controller('assignments')
export class AssignmentspController {
  constructor(private group: GroupService, private semesters: InstallmentDateService, private users: UsersService, private notes: NotesService) {
  }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAllWithAssignments(){
       return Promise.all([
            this.users.findAllActive(),
            this.notes.findAll(),
            this.group.findAllAssignment()
        ]).then(value => {
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
                    gender : value[0][i].gender === 1 ? 'M' : 'K',
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
                        obj.notes.push(value[1][j].note);
                    }
                    if (value[0][i].id_user < value[1][j].id_user){
                        lastNoteId = j;
                        break;
                    }
                }
                for (let j = lastAssigmentId; j < assignmentQuantity; j++) {
                    if (value[0][i].id_user === value[2][j]['id_user']){
                        obj.assignments.push(value[2][j]);
                    }
                    if (value[0][i].id_user < value[2][j]['id_user']){
                        lastAssigmentId = j;
                        break;
                    }
                }
                data.push(obj);
            }
            return data;
        });

    }
}

  

