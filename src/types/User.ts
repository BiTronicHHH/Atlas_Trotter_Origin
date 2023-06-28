import Profile from './Profile';

export default interface User extends Profile {
  idUser: string;
  mail: string;
}
