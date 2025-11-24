const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    discoteca: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" }
  },
  {
    timestamps: true,
    collection: "planes"
  }
);

PlanSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Plan", PlanSchema);
