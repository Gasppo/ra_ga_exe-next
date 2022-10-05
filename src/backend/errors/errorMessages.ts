export const minCharErrorMessage = (min: number) => `Se requiere un mínimo de ${min} ${min === 1 ? "caracter" : "caracteres"}`;
export const maxCharErrorMessage = (max: number) => `Se tiene un máximo de ${max} ${max === 1 ? "caracter" : "caracteres"}`;
export const emailErrorMessage = () => `Formato de correo electrónico inválido`;