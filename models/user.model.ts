import mongoose, { Document, models } from "mongoose";

export interface IUser extends Document {
    email: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true }
});

const UserModel = models.User || mongoose.model("User", UserSchema);

export default UserModel