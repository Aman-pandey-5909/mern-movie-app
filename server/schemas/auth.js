const z = require('zod');

const signupSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(20, { message: 'Password must be at most 20 characters' }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, { message: 'Password must contain at least one letter and one number' }),
    role: z.enum(['user', 'admin']).default('user'),
})

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20),
})

module.exports = { signupSchema, loginSchema }