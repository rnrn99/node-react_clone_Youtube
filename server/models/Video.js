const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    views: {
      type: Number,
      default: 0,
    },
    description: String,
    privacy: Number,
    filePath: String,
    category: String,
    duration: String,
    thumbnail: String,
  },
  { timestamps: true },
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
