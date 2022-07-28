import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        type: "OAuth2",        
        user: 'gaminggamehub1',
        pass: 'lnixxsvibgmixouh',
        clientId: "830954708046-ljadfm48r0mpm8c3s4upj8ct6n8lbv3k.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04Mz8jyuQ3V9XCgYIARAAGAQSNwF-L9Irkx6l_hXJ_bkYq8uSzS4rmaYlgd0sOE3BmulHHKabv0L8f6cUQt8yLGyuRqmpFqYEQx4",
        accessToken: "ya29.A0AVA9y1vDv62TgjPNjQfVtkMulXknSTegqOW0QgPvAXYl53HWtkWuhCW40iNnwwAIbebIAOzH1otcjwTl9lu4Tv48U5Z4VYfUAohjymkGA4UUKrkJvPSs2uBmmznUqLxTrEqT2Zeg8cdBbrQmgiCOammgi3tjYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4REtqdHMyRXhPcEhQQ3ViVGVEc0RVQQ0163"

    },
})

/* transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  })
 */

