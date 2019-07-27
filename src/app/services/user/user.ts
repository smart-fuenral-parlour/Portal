export class User {
    name: string;
    surname: string;
    branch: string;
    idrole: number;
    password: string;
    iduser: number;
    idEmployee: number;

}

export class newUsers {
    email: string;
    id: number;
    name: string;
    password: string;
    role: string;
    surname: string;
}

export class newUser {
    id: string;
    ttl: number;// time to live in seconds:2 weeks by default) ,
    //scopes: Array[string];// Array of scopes granted to this access token. ,
    created: string;
    userId: number;

    /* example vallue

  "id": "string",
  "ttl": 1209600,
  "scopes": [
    "string"
  ],
  "created": "2019-07-27T11:24:51.655Z",
  "userId": 0

    */

}

export class LoginUser {
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
