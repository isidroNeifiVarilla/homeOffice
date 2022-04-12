export interface Mensaje{
    message: string;
    date?: number;
    nickname: string;
    //llave del usuario q mando el mensaje
    correo: string;
    roomname: string;
}