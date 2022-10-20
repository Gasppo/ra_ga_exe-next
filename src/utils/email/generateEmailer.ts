import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export type UseEmailSenderData = { user: string, password: string, from: string, fromTitle: string }

export type SendEmailData = { to: string, subject: string, html: string }

export const generateEmailer = ({
    user,
    password,
    from,
    fromTitle,
}: UseEmailSenderData) => {



    const transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
            user: user,
            pass: password
        },
    });




    const sendEmail = async (data: SendEmailData) => {

        const { to, subject, html } = data;

        try {
            const mailOptions: Mail.Options = {
                from: `${fromTitle} <${from}>`,
                to: to,
                subject: subject,
                html: html
            }
            const info = await transporter.sendMail(mailOptions);
            console.log('Done', info);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const sendEmailTest = async (data: SendEmailData) => {
        console.log('Sent [TEST]', data)
    };

    return { sendEmail: password === 'testing' ? sendEmailTest : sendEmail }
};