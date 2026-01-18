import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email for this user.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password for this user.'],
        select: false, // Don't return password by default
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
});

// Check if model already exists to prevent overwrite error during hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
