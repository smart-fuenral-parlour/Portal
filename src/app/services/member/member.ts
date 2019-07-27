
export class Member {
  balance:string;
  contactnumber:string;
  createdby:string;
  email:string;
  gender:string;
  housenumber:string;
  id:number;
  identitynumber:string;
  idlifestatus:number;
  idpolicystatus:number;
  idpolicytype:number;
  lastpaiddate:string;
  membershipnumber:string;
  name:string;
  province:string;
  streetname:string;
  suburb:string;
  surname:string;
}
//////////////////////////////////////


export class Members {
  mainmember: {
    idmember: number;
    name: string;
    surname: string;
    identitynumber: string;
    gender: string;
    email: string;
    contactnumber: string;
    identitydocument: File;
    idlifestatus: number;
    housenumber: string
    streetname: string;
    suburb: string;
    province: string;
    createddate: Date;
    membershipnumber: string;
    lifestatus: string;
    policystatus: string;
    lastpaiddate: string;
    idpolicytype: number;
    createdby: string;
    balance: number;
  };
  beneficiary: [{
    //idbeneficiary: number;
    name: string;
    surname: string;
    identitynumber: string;
    idlifestatus: number;
    lifestatus: string;
    createddate: Date;
  }];
}



/**
 * http://putlockers.ws/watch/PGpXeWG3-x-rated-the-greatest-adult-movies-of-all-time.html
 *export class Member {
  idmember: number;
  membershipnumber: string;
  name: string;
  surname: string;
  identitynumber: string;
  gender: string;
  email: string;
  contactnumber: string;
  identitydocument: string;
  idlifestatus: number;
  iduser: number;
  housenumber: string
  streetname: string;
  suburb: string;
  province: string;
  idpolicytype: number;
  createddate: Date;
}


export class Member {
  mainmember: {
    idmember: number;
    name: string;
    surname: string;
    identitynumber: string;
    gender: string;
    email: string;
    contactnumber: string;
    identitydocument: File;
    idlifestatus: number;
    housenumber: string
    streetname: string;
    suburb: string;
    province: string;
    createddate: Date;
    membershipnumber: string;
    lifestatus: string;
    policystatus: string;
    lastpaiddate: string;
    idpolicytype: number;
    createdby: string;
    balance: number;
  };
  beneficiary: [{
    //idbeneficiary: number;
    name: string;
    surname: string;
    identitynumber: string;
    idlifestatus: number;
    lifestatus: string;
    createddate: Date;
  }];
}
 */


