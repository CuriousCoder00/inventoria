import emailStyles from "@/lib/emails/styles";

const verificationMailHTML = (verificationLink: string, userName: string) => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>Inventoria welcome email</title><!--[if !mso]>-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    ${emailStyles}
</head>
<body align='center'>
    <div class="main-body">
        <div class="email-container" align='start'>
            <h1>Welcome to Inventoria</h1>
            <p>Hi ${userName},</p>
            <p>Thank you for signing up to Inventoria. <br> We are excited to have you on board.</p>
            <p>Click the link below to verify your email address and complete your registration.</p>
            <a href="${verificationLink}">Verify email</a>
        </div>
    </div>
</body>
</html>`;

export default verificationMailHTML;