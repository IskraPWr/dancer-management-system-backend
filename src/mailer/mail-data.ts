import { IMailerData } from './../typings/typings.d';
import { readFile } from 'fs';
import * as nodemailer from 'nodemailer';
import { TMail, ITMail } from '../typings/typings';

const text: ITMail = {
  newPassSite: 'Twoje nowe hasło logowania do bazy SKTT Iskra to:',
  newPassApplication: 'Twoje nowe hasło logowania do aplikacji SKTT Iskra to:',
  newPassUser:
    'Wygenerowano nowe hasło dostępu do Twojego konta, użyj go by się zalogować. Hasło możesz zmienić w swoim panelu ustawień konta',
  newSiteAdmin:
    'Gratulujemy zostania nowym administratorem bazy SKTT Iskra PWr, \
    poniżej znajduje się Twój kod dostepu do strony, login uzyskasz od administratora który przypisał Cię do bazy.',
  newApplicationAdmin:
    'Gratulujemy zostania nowym administratorem aplikacji SKTT \
     Iskra PWr, poniżej znajduje się Twój kod dostepu do strony, login uzyskasz od administratora który przypisał Cię do bazy.',
  newUser:
    'Ogromnie się cieszymy że dołączyłeś do naszej Iskrowej społeczności. Do zobaczenia na zajęciach!',
};

const subject: ITMail = {
  newPassSite: 'Nowe hasło dostępu do bazy SKTT Iskra',
  newPassApplication: 'Nowe hasło dostępu do aplikacji SKTT Iskra',
  newPassUser: 'Nowe hasło dostępu do konta SKTT Iskra',
  newSiteAdmin: 'Hasło dostępu do bazy SKTT Iskra',
  newApplicationAdmin: 'Hasło dostępu do aplikacji SKTT Iskra',
  newUser: 'Witaj nowy użytkowniku!',
};

export class Mail {
  constructor() {
  }

  async sendMail( type: TMail,  mailToRecipient: string,  data?: IMailerData): Promise<any> {
    let mail;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.cba.pl',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sktt@sktt.cba.pl', // generated ethereal user
        pass: 'G3pdTSpaxp', // generated ethereal password
      },
    });

    // send mail with defined transport object
    await readFile('src/mailer/mail.html', {}, (err, readData) => {
      if (!err) {
        mail = readData
        .toString()
        .replace('*PASS*', data ? data.password : '')
        .replace('*TEXT*', text[type]);
      } else {
        throw err;
      }
    });

    return transporter.sendMail({
      from: '"SKTT Iskra PWr 🕺💃" <sktt@sktt.cba.pl>', // sender address
      to: mailToRecipient, // list of receivers
      html: mail, // html body
      subject: subject[type], // Subject line
      text: `${subject[type]} ${data ? '- ' + data.password : null}`, // plain text body
    })
  }
}
