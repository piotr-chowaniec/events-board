import * as Yup from 'yup';

const loginUserSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('First Name')
    .required()
    .min(5, 'First Name must be at least 5 characters long'),
  lastName: Yup.string()
    .label('Last Name')
    .required()
    .min(5, 'Last Name must be at least 5 characters long'),
  email: Yup.string().email().required().label('Email'),
});

const updatePasswordSchema = Yup.object().shape({
  password: Yup.string().label('Password').required(),
  confirmPassword: Yup.string()
    .label('Confirm Password')
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const registerUserSchema = updateProfileSchema.concat(updatePasswordSchema);

const updateUserSchema = updateProfileSchema.concat(
  Yup.object().shape({
    role: Yup.string().label('Role').required().oneOf(['admin', 'participant']),
  }),
);

export type LoginUserDto = Yup.InferType<typeof loginUserSchema>;
export type RegisterUserDto = Yup.InferType<typeof registerUserSchema>;

export default {
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
  updatePasswordSchema,
  updateUserSchema,
};
