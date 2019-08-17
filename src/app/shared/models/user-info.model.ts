import { UserPermissions } from './user-permissions.model';


export class UserInfo {
  userId: any;
  superuser: any;
  title: string ;
  forename: string ;
  surname: string ;
  email: string ;
  typeOfUser: string;
  logo: string;
  userType: string ;
  contactNumber: any ;
  supplierId: any ;
  active: any ;
  status: any ;
  retailers: Array<any> ;
  brands: Array<any> ;
  storeId: string ;
  permissions: Array<UserPermissions> ;
  applications: Array<any>;
  routes: Array<any>;
}


