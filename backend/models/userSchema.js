const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  userImage: { type: String },
  // plan: { type: String, required: true },
  // planStartDate: { type: Date, required: true },
  // planExpiryDate: { type: Date, required: true },
  // date now mangoose note search
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.pre("findOne", async function () {
//   this.email = this.email.toLowerCase();
//   this.password = await bcrypt.hash(this.password, 10);
// });
module.exports = mongoose.model("User", userSchema);

/*


*/
