import mongoose, { Document, models, Schema } from "mongoose";
import { IPortfolio } from "./portfolio.model";

export interface IUser extends Document {
    email: string;
    portfolio:mongoose.Types.ObjectId | IPortfolio;
}

const UserSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true },
    portfolio: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      default: null,
    },
},
{timestamps:true});

const UserModel = models.User || mongoose.model("User", UserSchema);

export default UserModel