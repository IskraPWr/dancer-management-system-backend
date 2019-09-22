export type TMail =
  | 'newPassSite'
  | 'newPassApplication'
  | 'newPassUser'
  | 'newSiteAdmin'
  | 'newApplicationAdmin'
  | 'newUser';

export interface IUser {
  department: string;
  email: string;
  index: string;
  name: string;
  phone: string;
  status?: boolean;
  surname: string;
  university: string;
  year: number;
  id_user?: number;
  login?: string;
  password?: string;
  declaration?: number;
  key1?: string;
  key2?: string;
  join_date?: string;
  gender?: number;
}

export interface ITMail {
  newPassSite: string;
  newPassApplication: string;
  newPassUser: string;
  newSiteAdmin: string;
  newApplicationAdmin: string;
  newUser: string;
}

export interface IMailerData {
  password?: string;
}

export interface ICheckLogin {
  login: string;
  id?: number;
}

export interface ICheckEmail {
  email: string;
  id?: number;
}

export interface ICheckPhone {
  phone: string;
  id?: number;
}

export interface ICheckKey {
  key: string;
  id?: number;
}

export interface ICheckLoginError {
  loginExist: boolean;
}

export interface ICheckEmailError {
  emailExist: boolean;
}

export interface ICheckPhoneError {
  phoneExist: boolean;
}

export interface ICheckKeyError {
  keyExist: boolean;
}

export interface IPresence {
  name: string;
  data: number;
}

export interface IPresenceStat2 {
  general: IPresenceGeneralData;
  days: IPresenceSemesterData[];
  groups: IPresenceSemesterData[];
  weekToWeek: IGenderStat[];
}

export interface IPresenceGeneralData {
  week: IWeekPresenceStat;
  month: IWeekPresenceStat;
  semester: IWeekPresenceStat;
  all: IWeekPresenceStat;
}

export interface IPresenceSemesterData {
  name: string;
  id_semester?: number;
  data: IPresence[] | IPresenceDaysData[] | IPresenceGroupsData[];
}

export interface IPresenceDaysData {
  week: string;
  days: IWeekPresenceStat;
}

export interface IPresenceGroupsData {
  name: string;
  groupData: IPresenceGroupDetails[];
 }

 export interface IPresenceGroupDetails {
  week: string;
  day: string;
  man: number;
  woman: number;
}

export interface IWeekPresenceStat {
  mon: IGenderStat;
  tue: IGenderStat;
  wed: IGenderStat;
  thu: IGenderStat;
  fri: IGenderStat;
  sat: IGenderStat;
  sun: IGenderStat;
}

export interface IGenderStat {
  man: number;
  woman: number;
  date?: string;
  week?: string;
}

export interface IPresencDaysData {
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;
}

export interface IPresenceStat {
  lastMonth: IPresence[];
  allSemestersGroups: IPresenceSemesterData[];
  allVisits: IPresence[];
}