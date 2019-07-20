export class Member {
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

export class MainMember {
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
  lastpaiddate: Date;
  idpolicytype: number;
  createdby: string;
  balance: number;
  beneficiary: []
}
