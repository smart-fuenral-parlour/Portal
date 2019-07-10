export class User
{   
    name: string;
    surname: string;
    branch: string;
    idrole: number;
    password: string;
    iduser: number;
 
}

export class LoginUser
{
    status: number
    error: null
    response: [
        {
            iduser: number;
            name: string
            surname: string
            password: string
            branch: string
            idrole: number;
        }
    ]
}
