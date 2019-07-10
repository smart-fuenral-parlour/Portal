export class User
{   
    name: string;
    surname: string;
    branch: string;
    idrole: number;
    password: string;
    iduser: number;
    idEmployee: number;
 
}

export class LoginUser
{
    status: number
    error: null
    response: [
        {
            idEmployee: number
            iduser: number;
            name: string
            surname: string
            password: string
            branch: string
            idrole: number;
        }
    ]
}
