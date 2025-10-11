import mongoose, { Document, Schema, models } from "mongoose";

export interface IPortfolio extends Document {
  userEmail: string; // To associate with the logged-in user
  name: string;
  about: string;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  socialLinks: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    portfolio: string | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userEmail: { type: String, required: true },
    name: { type: String, required: true },
    about: { type: String },
    skills: [{ type: String }],
    experience: [{ type: String }],
    education: [{ type: String }],
    projects: [{ type: String }],
    socialLinks: {
      github: { type: String, default: null },
      linkedin: { type: String, default: null },
      twitter: { type: String, default: null },
      portfolio: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const PortfolioModel =
  models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default PortfolioModel;
