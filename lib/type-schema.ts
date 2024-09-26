import z from 'zod';

export const UserTypeSchema = z.object({
  email: z.string().email(),
  passWord: z.string().min(6).max(64),
  mobileNumber: z.string().regex(/^[0-9]{9,11}$/),
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Must contain alphabets only')
    .min(3)
    .max(12),
  lastName: z.string().min(3).max(12),
  address: z.string().max(255),
  state: z.string().min(2).max(3),
  nid: z
    .string()
    .regex(/^[0-9]+$/)
    .min(8)
    .max(18),
  postalCode: z
    .string()
    .regex(/^[0-9]+$/, 'Must only contain digits')
    .max(8),
  dateOfBirth: z.date({
    required_error: 'A date of birth is required.',
  }),
});
