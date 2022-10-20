import { ValidatedOrderSchema } from "@backend/schemas/OrderCreationSchema";

export const generateOrderID = (data: ValidatedOrderSchema) => {
    const today = new Date()
    const dateFormat = `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}-${today.getHours()}${today.getMinutes()}`

    return `${data.user.name.substring(0, 3).toUpperCase()}-${data.tipoPrenda.name.substring(0, 3).toUpperCase()}-${dateFormat}`
}