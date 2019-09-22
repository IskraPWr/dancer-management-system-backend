"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const nodemailer = require("nodemailer");
const text = {
    newPassSite: 'Twoje nowe hasło logowania do bazy SKTT Iskra to:',
    newPassApplication: 'Twoje nowe hasło logowania do aplikacji SKTT Iskra to:',
    newPassUser: 'Wygenerowano nowe hasło dostępu do Twojego konta, użyj go by się zalogować. Hasło możesz zmienić w swoim panelu ustawień konta',
    newSiteAdmin: 'Gratulujemy zostania nowym administratorem bazy SKTT Iskra PWr, \
    poniżej znajduje się Twój kod dostepu do strony, login uzyskasz od administratora który przypisał Cię do bazy.',
    newApplicationAdmin: 'Gratulujemy zostania nowym administratorem aplikacji SKTT \
     Iskra PWr, poniżej znajduje się Twój kod dostepu do strony, login uzyskasz od administratora który przypisał Cię do bazy.',
    newUser: 'Ogromnie się cieszymy że dołączyłeś do naszej Iskrowej społeczności. Do zobaczenia na zajęciach!',
};
const subject = {
    newPassSite: 'Nowe hasło dostępu do bazy SKTT Iskra',
    newPassApplication: 'Nowe hasło dostępu do aplikacji SKTT Iskra',
    newPassUser: 'Nowe hasło dostępu do konta SKTT Iskra',
    newSiteAdmin: 'Hasło dostępu do bazy SKTT Iskra',
    newApplicationAdmin: 'Hasło dostępu do aplikacji SKTT Iskra',
    newUser: 'Witaj nowy użytkowniku!',
};
class Mail {
    constructor() {
    }
    async sendMail(type, mailToRecipient, data) {
        let mail;
        let transporter = nodemailer.createTransport({
            host: 'mail.cba.pl',
            port: 587,
            secure: false,
            auth: {
                user: 'sktt@sktt.cba.pl',
                pass: 'G3pdTSpaxp',
            },
        });
        await fs_1.readFile('../iskra2/src/mailer/mail.html', {}, (err, readData) => {
            if (!err) {
                mail = readData
                    .toString()
                    .replace('*PASS*', data ? data.password : '')
                    .replace('*TEXT*', text[type]);
            }
            else {
                throw err;
            }
        });
        return transporter.sendMail({
            from: '"SKTT Iskra PWr 🕺💃" <sktt@sktt.cba.pl>',
            to: mailToRecipient,
            html: mail,
            subject: subject[type],
            text: `${subject[type]} ${data ? '- ' + data.password : null}`,
        });
    }
}
exports.Mail = Mail;
//# sourceMappingURL=mail-data.js.map