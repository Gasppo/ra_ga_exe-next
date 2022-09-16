export const emailTemplate = (data: any) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
    
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    
    <body>
        <div style="background-color: midnightblue;padding:1rem; border-radius: 0.5rem;margin:4rem;">
            <div style="background-color: white;padding:2rem;box-shadow: 5px 5px 20px slategray; border-radius: 0.5rem;">
                <div>
                    <h1 style="font-family:Georgia;color:darkslategrey">Hola ${data.name}</h1>
                </div>
                <div style="color:dimgray">
                    <p>Se ha recibido una solicitud de restablecimiento de contraseña</p>
                    <p>Haga click en el boton para proceder</p>
                    <a href="${process.env.NEXTAUTH_URL}/user/reset/${data.resetToken}">Resetear clave</a>
                </div>
            </div>
        </div>
    </body>
    
    </html>
                `

}