import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsNumberString,
  IsNumber,
} from 'class-validator';

export class NewAccountData {
  @IsString()
  department: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  gender: number;

  @IsString()
  university: string;

  @IsNumberString()
  index: string;

  @IsString()
  key1: string;

  @IsString()
  key2: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsPhoneNumber('PL')
  phone: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  uniwersity: string;

  @IsNumber()
  year: number;
}

export class LogIn {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class GeneratePass {
  @IsString()
  login: string;

  @IsEmail()
  email: string;
}



