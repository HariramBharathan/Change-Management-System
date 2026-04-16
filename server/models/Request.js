import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  request_id: { type: String, unique: true },
  faculty_id: { type: String, required: true },
  faculty_name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'PENDING_HOD' },
  hod_comment: { type: String },
  academic_comment: { type: String },
  old_value: { type: String },
  new_value: { type: String },
  student_name: { type: String },
  student_reg_num: { type: String },
  subject_name: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

requestSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

requestSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

const Request = mongoose.model('Request', requestSchema);
export default Request;
