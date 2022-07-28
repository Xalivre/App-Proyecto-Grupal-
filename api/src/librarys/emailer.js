import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: 'gaminggamehub0',
        pass: 'lnixxsvibgmixouh'
    }
})

transporter.verify().then(() => {
    console.log('ready for send emails')
})