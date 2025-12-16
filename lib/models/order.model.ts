import mongoose, { Document, Model, Schema } from "mongoose";
import type { UserInterface } from "../models/user.model";
import type { BookListingInterface } from "./booklisting.model";

export type OrderStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";
export type PaymentProvider = "STRIPE" | "RAZORPAY";
export type FulfillmentType = "MEETUP" | "DELIVERY";

export interface DeliveryAddress {
  fullName: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
}

export interface OrderInterface extends Document {
  buyer: mongoose.Types.ObjectId | UserInterface;
  seller: mongoose.Types.ObjectId | UserInterface;
  listing: mongoose.Types.ObjectId | BookListingInterface;

  amount: number;
  currency: "INR";

  status: OrderStatus;

  paymentProvider: PaymentProvider;
  paymentId?: string;
  paymentMeta?: Record<string , unknown>;

  fulfillmentType: FulfillmentType;
  deliveryAddress?: DeliveryAddress;
  meetupLocation?: string;
  notesForSeller?: string;

  createdAt: Date;
  updatedAt: Date;
}

const DeliveryAddressSchema = new Schema<DeliveryAddress>(
  {
    fullName: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    landmark: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: "India" },
    phone: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const orderSchema = new Schema<OrderInterface>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: "BookListing",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },

    paymentProvider: {
      type: String,
      enum: ["STRIPE", "RAZORPAY"],
      required: true,
    },
    paymentId: {
      type: String,
      trim: true,
    },
    paymentMeta: {
      type: Schema.Types.Mixed, // small extra data from gateway
    },

    fulfillmentType: {
      type: String,
      enum: ["MEETUP", "DELIVERY"],
      required: true,
    },
    deliveryAddress: {
      type: DeliveryAddressSchema,
      required: false, // required only if fulfillmentType === "DELIVERY"
    },
    meetupLocation: {
      type: String,
      trim: true,
    },
    notesForSeller: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Helpful compound indexes
orderSchema.index({ buyer: 1, createdAt: -1 });
orderSchema.index({ seller: 1, createdAt: -1 });

export const Order: Model<OrderInterface> =
  mongoose.models.Order || mongoose.model<OrderInterface>("Order", orderSchema);
