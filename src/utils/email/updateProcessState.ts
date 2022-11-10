export const updateProcessStateHTML = (data: { name: string, orderId: string, newProcessState: string, processName: string }) => {
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
                <h1 style="font-family:Georgia;color:darkslategrey">Señor ${data.name}</h1>
            </div>
            <div style="color:dimgray">
                <p>Se ha actualizado el estado del proceso de <em>${data.processName}</em> a <b>${data.newProcessState} para la orden <em>${data.orderId}</em></b></p>
                <p>Para ver el detalle de la orden, haga <a href="${process.env.NEXTAUTH_URL || process.env.VERCEL_URL}/orden/${data.orderId}">click aqui</a></p>
            </div>
        </div>
    </div>
</body>
</html>
    `
}