import { readFile } from 'fs';
import * as nodemailer from 'nodemailer';

export class Mail {
  constructor(pass, email, type) {
	this.type = type;
    this.pass = pass;
    this.email = email;
    this.main();
  }
  pass;
  email;
  type;
  text = [
	  'Gratulujemy zostania nowym administratorem bazy SKTT Iskra PWr, poniżej znajduje się Twój kod dostepu do strony, login uzyskasz od administratora który przypisał Cię do bazy.',
	  'Twoje nowe hasło logowania do bazy SKTT Iskra to:',
	  'Gratulujemy zostania nowym administratorem aplikacji SKTT Iskra PWr, poniżej znajduje się Twój kod dostepu do strony, login uzyskasz od administratora który przypisał Cię do bazy.',
	  'Twoje nowe hasło logowania do aplikacji SKTT Iskra to:',
	  'Ogromnie się cieszymy że dołączyłeś do naszej Iskrowej społeczności. Do zobaczenia na zajęciach!',
	  'Wygenerowano nowe hasło dostępu do Twojego konta, użyj go by się zalogować. Hasło możesz zmienić w swoim panelu ustawień konta',
  ];

  subject = [
	  'Hasło dostępu do bazy SKTT Iskra',
	  'Nowe hasło dostępu do bazy SKTT Iskra',
	  'Hasło dostępu do aplikacji SKTT Iskra',
	  'Nowe hasło dostępu do aplikacji SKTT Iskra',
	  'Witaj nowy użytkowniku!',
	  'Nowe hasło dostępu do konta SKTT Iskra',
  ]

  async main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.pwr.edu.pl',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sktt@pwr.edu.pl', // generated ethereal user
        pass: 'SKTT%20_PWr!', // generated ethereal password
      },
	});
	
    // send mail with defined transport object
    readFile('../iskra2/src/admins/mail.html', {}, (err, data) => {
      let mail = data.toString().replace('*PASS*', this.pass).replace('*TEXT*', this.text[this.type]);
      transporter.sendMail({
        from: '"SKTT Iskra PWr 🕺💃" <sktt@pwr.edu.pl>', // sender address
        to: this.email, // list of receivers
        subject: this.subject[this.type], // Subject line
        text: this.subject[this.type] + ': ' + this.pass, // plain text body
        html: mail, // html body
      });
    });
  }
}
