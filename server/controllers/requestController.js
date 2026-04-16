import Request from "../models/Request.js";

// Get requests endpoint
export const getRequests = async (req, res) => {
  try {
    // Auto-expire requests older than 48 hours that are still pending
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    await Request.updateMany(
      { 
        status: { $regex: /^PENDING_/ }, 
        created_at: { $lt: fortyEightHoursAgo } 
      },
      { $set: { status: 'EXPIRED' } }
    );

    const { role, facultyId, studentRegNum } = req.query;
    let query = {};

    if (role === 'FACULTY' && facultyId) {
      query.faculty_id = facultyId;
    } else if (role === 'STUDENT' && studentRegNum) {
      const cleanRegNum = String(studentRegNum).trim();
      query.student_reg_num = { $regex: new RegExp(`^${cleanRegNum}$`, 'i') };
    } else if (role === 'HOD') {
      query.status = { $in: ['PENDING_HOD', 'REJECTED_HOD', 'PENDING_ACADEMIC', 'IMPLEMENTED'] };
    } else if (role === 'ACADEMIC') {
      query.status = { $in: ['PENDING_ACADEMIC', 'IMPLEMENTED'] };
    }

    const requests = await Request.find(query).sort({ created_at: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create request endpoint
export const createRequest = async (req, res) => {
  try {
    const { facultyId, facultyName, type, description, oldValue, newValue, studentName, studentRegNum, subjectName } = req.body;
    
    const count = await Request.countDocuments();
    const requestId = `F${(1000 + count + 1).toString()}`;

    const newRequest = new Request({
      request_id: requestId,
      faculty_id: facultyId,
      faculty_name: facultyName,
      type,
      description,
      old_value: oldValue,
      new_value: newValue,
      student_name: studentName,
      student_reg_num: studentRegNum,
      subject_name: subjectName
    });
    
    const savedRequest = await newRequest.save();
    res.json({ id: savedRequest.id, request_id: savedRequest.request_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve HOD endpoint
export const approveHOD = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;
    
    await Request.findByIdAndUpdate(id, {
      status: status,
      hod_comment: comment
    });
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve Academic endpoint
export const approveAcademic = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    
    await Request.findByIdAndUpdate(id, {
      status: 'IMPLEMENTED',
      academic_comment: comment
    });
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
