import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../models/User.js";
import Request from "../models/Request.js";

const seedUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    console.log("Seeding initial users...");
    await User.create([
      { id: 'F001', name: 'DHANUSH S', email: 'faculty@gmail.com', role: 'FACULTY', department: 'Electronics and Communication', password: 'abi123' },
      { id: 'F002', name: 'MEENA R', email: 'faculty2@gmail.com', role: 'FACULTY', department: 'Computer Science', password: 'abi123' },
      { id: 'H001', name: 'PRAKASH P', email: 'hod@gmail.com', role: 'HOD', department: 'Electronics and Communication', password: 'abi123' },
      { id: 'A001', name: 'Academic Admin Team', email: 'academic@gmail.com', role: 'ACADEMIC', department: 'Academic Affairs', password: 'abi123' },
      { id: 'S001', name: 'Abishek', email: 'student@gmail.com', role: 'STUDENT', department: 'Electronics and Communication', student_reg_num: 'EC101', password: 'abi123' },
      { id: 'S002', name: 'Aswin', email: 'student2@gmail.com', role: 'STUDENT', department: 'Electronics and Communication', student_reg_num: 'EC105', password: 'abi123' }
    ]);
  }
};

const seedData = async () => {
  const count = await Request.countDocuments();
  if (count === 0) {
    console.log("Seeding initial requests...");
    await Request.create([
      {
        request_id: 'F1001',
        faculty_id: 'F001',
        faculty_name: 'DHANUSH S',
        type: 'marks',
        description: 'Internal marks correction for Unit Test 1. Student was marked absent by mistake.',
        old_value: '0',
        new_value: '42',
        student_name: 'Abishek',
        student_reg_num: 'EC101',
        subject_name: 'Digital Signal Processing',
        status: 'IMPLEMENTED',
        hod_comment: 'Approved after verification.',
        academic_comment: 'Marks updated in the central portal.'
      },
      {
        request_id: 'F1002',
        faculty_id: 'F001',
        faculty_name: 'DHANUSH S',
        type: 'date',
        description: 'Requesting exam date change due to national holiday overlap.',
        old_value: '2024-04-15',
        new_value: '2024-04-18',
        student_name: 'Abishek',
        student_reg_num: 'EC101',
        subject_name: 'Microprocessors',
        status: 'PENDING_HOD'
      },
      {
        request_id: 'F1003',
        faculty_id: 'F001',
        faculty_name: 'DHANUSH S',
        type: 'revaluation',
        description: 'Student requested revaluation for the end-semester exam. Paper was re-evaluated by the department committee.',
        old_value: 'ARREAR',
        new_value: 'Pass (Grade B)',
        student_name: 'Abishek',
        student_reg_num: 'EC101',
        subject_name: 'Electromagnetic Fields',
        status: 'PENDING_ACADEMIC',
        hod_comment: 'Recommended for grade update after re-evaluation.'
      },
      {
        request_id: 'F1004',
        faculty_id: 'F001',
        faculty_name: 'DHANUSH S',
        type: 'venue',
        description: 'Venue change required due to laboratory maintenance in the original hall.',
        old_value: 'Lab 102',
        new_value: 'Main Seminar Hall',
        student_name: 'Abishek',
        student_reg_num: 'EC101',
        subject_name: 'VLSI Design Lab',
        status: 'PENDING_HOD'
      },
      {
        request_id: 'F1005',
        faculty_id: 'F001',
        faculty_name: 'DHANUSH S',
        type: 'revaluation',
        description: 'Revaluation request for Control Systems. Initial evaluation missed a few pages.',
        old_value: 'ARREAR',
        new_value: 'Pass (Grade A)',
        student_name: 'Aswin',
        student_reg_num: 'EC105',
        subject_name: 'Control Systems',
        status: 'IMPLEMENTED',
        hod_comment: 'Approved. Missed pages were evaluated.',
        academic_comment: 'Grade updated in the system.'
      },
      {
        request_id: 'F1006',
        faculty_id: 'F002',
        faculty_name: 'MEENA R',
        type: 'marks',
        description: 'Internal marks correction for Python Programming. Totaling error found in the answer script.',
        old_value: '38',
        new_value: '45',
        student_name: 'Abishek',
        student_reg_num: 'EC101',
        subject_name: 'Python Programming',
        status: 'PENDING_HOD'
      },
      {
        request_id: 'F1007',
        faculty_id: 'F002',
        faculty_name: 'MEENA R',
        type: 'date',
        description: 'Practical exam date rescheduling due to system maintenance.',
        old_value: '2024-05-10',
        new_value: '2024-05-12',
        student_name: 'Aswin',
        student_reg_num: 'EC105',
        subject_name: 'Data Structures Lab',
        status: 'PENDING_HOD'
      }
    ]);
    console.log("Seed data created.");
  }
};

let dbConnectionPromise = null;

const connectToDB = async () => {
  let mongoUri = process.env.MONGODB_URI;
  let usingMemoryServer = false;

  const tryConnect = async (uri) => {
    console.log(`Connecting to MongoDB at ${uri.replace(/:([^:@]{4,})@/, ':****@')}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
  };

  try {
    if (mongoUri) {
      try {
        await tryConnect(mongoUri);
        console.log("✅ Successfully connected to provided MongoDB URI");
      } catch (primaryErr) {
        console.warn("⚠️ Primary MongoDB connection failed, falling back to in-memory server:", primaryErr.message);
        usingMemoryServer = true;
      }
    } else {
      usingMemoryServer = true;
    }

    if (usingMemoryServer) {
      console.log("Starting in-memory MongoDB server...");
      const mongoServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'cms'
        }
      });
      const memoryUri = mongoServer.getUri();
      await tryConnect(memoryUri);
      console.log("✅ Successfully connected to in-memory MongoDB");
    }
    
    // Seed data
    await seedUsers();
    await seedData();
  } catch (err) {
    console.error("❌ CRITICAL DATABASE ERROR:", err.message);
    dbConnectionPromise = null;
    throw err;
  }
};

export const ensureDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectToDB();
  }
  
  return dbConnectionPromise;
};
