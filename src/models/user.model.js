/**
 * Avnish Kumar's User Data Model
 * I define the structure and validation rules for user data here.
 * This is the blueprint for how user information is stored in MongoDB.
 */

import mongoose from "mongoose";

/**
 * User Schema Definition
 * I keep this simple but secure - only storing essential user information.
 * The schema enforces data integrity and provides built-in validation.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // I provide custom error messages
      trim: true, // Remove whitespace from both ends
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Prevent duplicate email addresses
      lowercase: true, // Always store emails in lowercase for consistency
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ], // I use regex to validate email format
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Security: Don't return password in queries by default
    },
    // I could add more fields here later:
    // role: { type: String, enum: ['user', 'admin'], default: 'user' },
    // isEmailVerified: { type: Boolean, default: false },
    // lastLogin: { type: Date },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    // This gives me audit trail for when users sign up and update profiles
  },
);

// Index for faster email lookups - emails are used frequently for login
userSchema.index({ email: 1 });

// I can add custom methods here later:
// userSchema.methods.comparePassword = function(candidatePassword) { ... }
// userSchema.methods.generateAuthToken = function() { ... }

// Export the model so I can use it throughout my app
export const User = mongoose.model("User", userSchema);
