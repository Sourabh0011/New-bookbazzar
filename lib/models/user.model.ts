import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole = "USER" | "ADMIN";

export interface Address {
    fullName?: string;
    street?: string;
    landmark?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
}

export interface UserInterface extends Document {
    name: string;
    email?: string;        // optional (we can support phone-only users)
    phone?: string;        // stored as string for safety
    passwordHash?: string; // required in practice for password auth

    address?: Address;

    avatarUrl?: string;
    role: UserRole;

    createdAt: Date;
    updatedAt: Date;
}

const AddressSchema = new Schema<Address>(
    {
        fullName: { type: String, trim: true },
        street: { type: String, trim: true },
        landmark: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        pincode: { type: String, trim: true },
        country: { type: String, trim: true, default: "India" },
    },
    { _id: false }
);

const userSchema = new Schema<UserInterface>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            sparse: true, // allows many docs without email
        },
        phone: {
            type: String,
            trim: true,
            unique: true,
            sparse: true, // allows many docs without phone
            match: /^[0-9]{10,12}$/,
        },
        passwordHash: {
            type: String,
            required: false, // required only for password-based accounts
            select: false,   // don’t return by default
        },
        address: {
            type: AddressSchema,
            required: false,
        },
        avatarUrl: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
            index: true,
        },
    },
    { timestamps: true }
);

// Example extra index (optional):
userSchema.index({ "address.city": 1 });

export const User: Model<UserInterface> =
    mongoose.models.User || mongoose.model<UserInterface>("User", userSchema);
