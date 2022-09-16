import { NodeMailgun } from 'ts-mailgun';


export type UseEmailSenderData = { apiKey: string, domain: string, from: string, fromTitle: string }

export type SendEmailData = { to: string, subject: string, html: string }

export const generateEmailer = ({
    apiKey,
    domain,
    from,
    fromTitle,
}: UseEmailSenderData) => {

    const mailer = new NodeMailgun();
    mailer.apiKey = apiKey; // Set your API key
    mailer.domain = domain; // Set the domain you registered earlier
    mailer.fromEmail = from; // Set your from email
    mailer.fromTitle = fromTitle; // Set the name you would like to send from

    mailer.init();


    const sendEmail = async (data: SendEmailData) => {

        const { to, subject, html } = data;

        try {
            const result = await mailer.send(to, subject, html);
            console.log('Done', result);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return { sendEmail };
}


