import User from "../models/User.js";

// Login endpoint
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    if (user.status !== 'APPROVED') {
      return res.status(403).json({ error: `Your account is currently ${user.status.replace('_', ' ')}. Please wait for approval.` });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register endpoint
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department, student_reg_num } = req.body;
    
    if (role === 'ACADEMIC') {
      return res.status(403).json({ error: "Cannot register as Academic role." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const id = `U${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    let status = 'APPROVED';
    if (role === 'STUDENT') status = 'PENDING_FACULTY';
    else if (role === 'FACULTY') status = 'PENDING_HOD';
    else if (role === 'HOD') status = 'PENDING_ACADEMIC';

    const newUser = await User.create({
      id, name, email, password, role, department, student_reg_num, status
    });
    
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Pending users endpoint
export const getPendingUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let targetStatus = '';
    
    if (role === 'FACULTY') targetStatus = 'PENDING_FACULTY';
    else if (role === 'HOD') targetStatus = 'PENDING_HOD';
    else if (role === 'ACADEMIC') targetStatus = 'PENDING_ACADEMIC';
    else return res.json([]);

    const pendingUsers = await User.find({ status: targetStatus });
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve user endpoint
export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findOneAndUpdate(
      { id },
      { $set: { status } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user endpoint
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, student_reg_num } = req.body;
    
    const updatedUser = await User.findOneAndUpdate(
      { id: id },
      { 
        $set: { 
          name, 
          department, 
          student_reg_num 
        } 
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
