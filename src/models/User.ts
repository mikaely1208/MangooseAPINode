import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document { // ici on définit les propriétés de l'objet User
  _id: any;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({ // ici on définit le schéma de l'objet User
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);