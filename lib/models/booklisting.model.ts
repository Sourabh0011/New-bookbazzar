import mongoose, { Document, Model, Schema } from "mongoose";
import type {UserInterface} from "../models/user.model"

export type BookCondition = "NEW" | "LIKE_NEW" | "GOOD" | "OKAY";
export type ListingStatus = "ACTIVE" | "RESERVED" | "SOLD" | "HIDDEN";

export interface ListingLocation {
  city: string;
  state?: string;
  pincode?: string;
  fullAddress?: string;
  landmark?: string;
  // GeoJSON point for future "nearby books" feature
  geo?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface BookListingInterface extends Document {
  seller: mongoose.Types.ObjectId | UserInterface;

  title: string;
  author: string;
  subject?: string;
  description?: string;

  price: number;
  currency: "INR";

  condition: BookCondition;
  status: ListingStatus;

  images: string[];

  location: ListingLocation;

  viewsCount: number;
  favoritesCount: number;

  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ListingLocation>(
  {
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    fullAddress: { type: String, trim: true },
    landmark: { type: String, trim: true },
    geo: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
      },
    },
  },
  { _id: false }
);

const bookListingSchema = new Schema<BookListingInterface>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },

    condition: {
      type: String,
      enum: ["NEW", "LIKE_NEW", "GOOD", "OKAY"],
      default: "GOOD",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "RESERVED", "SOLD", "HIDDEN"],
      default: "ACTIVE",
      index: true,
    },

    images: {
      type: [String],
      default: [],
    },

    location: {
      type: LocationSchema,
      required: true,
    },

    viewsCount: {
      type: Number,
      default: 0,
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for performance
bookListingSchema.index({ status: 1, createdAt: -1 });
bookListingSchema.index({ "location.city": 1 });
bookListingSchema.index({ "location.geo": "2dsphere" }); // for future nearby search

export const BookListing: Model<BookListingInterface> =
  mongoose.models.BookListing ||
  mongoose.model<BookListingInterface>("BookListing", bookListingSchema);
