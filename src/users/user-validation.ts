import joi from 'joi';

export const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
  confirmPassword: joi.ref('password'),
  name: joi.string().max(20).required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
});
