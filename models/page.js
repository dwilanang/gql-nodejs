const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
    {
      userid: {
        type: Number,
        required: true,
      },
      identity: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )

module.exports = mongoose.model("pages", pageSchema);