const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    avartar: {
      type: String,
      default:
        "https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png",
    },
    friends: [
      {
        id: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
