import mongoose from "mongoose";

const { Schema, model, models } = mongoose; // Destructure Schema, model, and models from mongoose

const CategorySchema = new Schema({
  name: { type: String, required: true }, // Define the category name
});

// ProductSchema.index({ title: "text" });

export const Category = models?.Category || model("Category", CategorySchema);
