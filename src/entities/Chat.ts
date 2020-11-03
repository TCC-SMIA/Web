import IMessage from './Message';
import IUser from './User';

export default interface IChat {
  id: string;
  user_id: string;
  user: IUser;
  destinatary: IUser;
  messages: IMessage[];
}
