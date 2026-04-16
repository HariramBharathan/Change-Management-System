import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  department: { type: String },
  student_reg_num: { type: String },
  password: { type: String, required: true },
  status: { type: String, default: 'APPROVED' }
});

const User = mongoose.model('User', userSchema);
export default User;
