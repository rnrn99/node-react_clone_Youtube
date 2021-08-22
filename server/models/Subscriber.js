const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscribeSchema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Subscriber = mongoose.model("Subscriber", subscribeSchema);

module.exports = { Subscriber };
