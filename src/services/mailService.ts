import nodemailer from 'nodemailer';

export const sendNewUserNotification = async (toEmail: string, newUserName: string, newUserEmail: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const approvalUrl = `${process.env.FRONTEND_URL}`;

    const mailOptions = {
        from: '"Grandes Mamiferos Serra do Mar" <no-reply@serradomar.com>',
        to: toEmail,
        subject: 'Novo usuário aguardando aprovação',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color:rgb(15, 148, 82); padding: 20px; color: white; text-align: center;">
                        <div style="padding: 20px; text-align: center;">
                            <img src="http://212.85.19.3:3002/logomarca.png" alt="Sistema Serradomar" style="max-width: 180px; height: auto;" />
                        </div>
                    </div>
                    <div style="padding: 30px; color: #333;">
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">
                        O usuário <strong>${newUserName}</strong> (<a href="mailto:${newUserEmail}">${newUserEmail}</a>) acabou de se registrar e está aguardando aprovação para acessar o sistema.
                    </p>
                    <p style="margin: 30px 0;">
                        <a href="${approvalUrl}" style="display: inline-block; padding: 12px 24px; background-color: rgb(15, 148, 82); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Liberar Acessos
                        </a>
                    </p>
                    <p style="font-size: 14px; color: #666;">
                        Você está recebendo este e-mail porque é um administrador do sistema.
                    </p>
                    </div>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Grandes Mamiferos Serra do Mar
                    </div>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export const sendNewUserNotificationActive = async (toEmail: string, newUserName: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const url = `${process.env.SITE_URL}`;

    const mailOptions = {
        from: '"Grandes Mamiferos Serra do Mar" <no-reply@serradomar.com>',
        to: toEmail,
        subject: 'Seu pedido de acesso foi APROVADO!!',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color:rgb(15, 148, 82); padding: 20px; color: white; text-align: center;">
                        <div style="padding: 20px; text-align: center;">
                            <img src="http://212.85.19.3:3002/logomarca.png" alt="Sistema Serradomar" style="max-width: 180px; height: auto;" />
                        </div>
                    </div>
                    <div style="padding: 30px; color: #333;">
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">
                        <strong>${newUserName}</strong> você acaba de receber sua aprovação para acessar o sistema!
                    </p>
                    <p style="margin: 30px 0;">
                        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: rgb(15, 148, 82); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Fazer Login
                        </a>
                    </p>
                    <p style="font-size: 14px; color: #666;">
                        Você está recebendo este e-mail porque é um convidado do sistema.
                    </p>
                    </div>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Grandes Mamiferos Serra do Mar
                    </div>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export const sendNewUserNotificationInactive = async (toEmail: string, newUserName: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: '"Grandes Mamiferos Serra do Mar" <no-reply@serradomar.com>',
        to: toEmail,
        subject: 'Seu pedido de acesso foi RECUSADO!!',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color:rgb(184, 28, 28); padding: 20px; color: white; text-align: center;">
                        <div style="padding: 20px; text-align: center;">
                            <img src="http://212.85.19.3:3002/logomarca.png" alt="Sistema Serradomar" style="max-width: 180px; height: auto;" />
                        </div>
                    </div>
                    <div style="padding: 30px; color: #333;">
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">
                        ${newUserName}</strong> você acabou de ter seu pedido de aprovação cancelado para acessar o sistema. Em caso de duvida entre em contato no número +55 41 9117-8082 
                    </p>
                    <p style="font-size: 14px; color: #666;">
                        Você está recebendo este e-mail porque é um convidado do sistema.
                    </p>
                    </div>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Grandes Mamiferos Serra do Mar
                    </div>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export const sendResetPasswordNotification = async (toEmail: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: '"Grandes Mamiferos Serra do Mar" <no-reply@serradomar.com>',
        to: toEmail,
        subject: 'Seu link para criar uma nova senha!!',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color:rgb(132, 28, 184); padding: 20px; color: white; text-align: center;">
                        <div style="padding: 20px; text-align: center;">
                            <img src="http://212.85.19.3:3002/logomarca.png" alt="Sistema Serradomar" style="max-width: 180px; height: auto;" />
                        </div>
                    </div>
                    <div style="padding: 30px; color: #333;">
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">
                        Acesse seu link para fazer sua nova senha! Este link irá expirar em 24 horas, LINK 
                    </p>
                    <p style="font-size: 14px; color: #666;">
                        Você está recebendo este e-mail porque é um convidado do sistema.
                    </p>
                    </div>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Grandes Mamiferos Serra do Mar
                    </div>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};