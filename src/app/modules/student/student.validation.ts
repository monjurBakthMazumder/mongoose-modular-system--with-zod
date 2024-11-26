import { z } from 'zod';

// User Name Schema (with optional middleName)
const userNameValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required and cannot be empty").trim(),
  middleName: z.string().trim().optional(), // `optional()` here means it's not required, but if provided, it's treated as a string
  lastName: z.string().min(1, "Last name is required and cannot be empty").trim(),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, "Student ID is required"),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: "Gender must be 'male', 'female', or 'other'" }),
  }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address").trim(),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: "Invalid blood group. Valid values are: A+, A-, B+, B-, AB+, AB-, O+, O-" }),
  }),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked'], {
    errorMap: () => ({ message: "Status must be 'active' or 'blocked'" }),
  }).default('active'),
});

export default studentValidationSchema;
