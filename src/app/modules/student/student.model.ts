import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required and cannot be empty"],
    trim  : true,
  },
  middleName: {
    type: String,
    trim  : true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required and cannot be empty"],
    trim  : true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<Student>({
  id: { 
    type: String, 
    required: [true, "Student ID is required"], 
    unique: true 
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender. Valid values are: male, female, or other',
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { 
    type: String, 
    required: [true, "Date of birth is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email address is required"], 
    trim  : true,
    unique: true 
  },
  contactNo: { 
    type: String, 
    required: [true, "Contact number is required"] 
  },
  emergencyContactNo: { 
    type: String, 
    required: [true, "Emergency contact number is required"] 
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    message: '{VALUE} is not a valid blood group. Valid values are: A+, A-, B+, B-, AB+, AB-, O+, O-',
  },
  presentAddress: { 
    type: String, 
    required: [true, "Present address is required"] 
  },
  permanentAddress: { 
    type: String, 
    required: [true, "Permanent address is required"] 
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian details are required"],
  },
  profileImg: { 
    type: String 
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    message: '{VALUE} is not a valid status. Valid values are: active, blocked',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
