import * as Yup from 'yup';

const Email = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
});

const Password = Yup.object().shape({
  password: Yup.string().label('Password').required(),
});

const ConfirmPasswordSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .label('Confirm Password')
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Name = Yup.object().shape({
  firstName: Yup.string()
    .label('First Name')
    .required()
    .min(4, 'First Name must be at least 4 characters long'),
  lastName: Yup.string()
    .label('Last Name')
    .required()
    .min(4, 'Last Name must be at least 4 characters long'),
});

const Role = Yup.object().shape({
  role: Yup.string().label('Role').required().oneOf(['USER', 'ADMIN']),
});

const loginUserSchema = Email.concat(Password);
const updateProfileSchema = Name.concat(Email);
const updatePasswordSchema = Password.concat(ConfirmPasswordSchema);

const registerUserSchema = updateProfileSchema.concat(Password);
const registerUserFormSchema = updateProfileSchema
  .concat(Password)
  .concat(updatePasswordSchema);

const updateUserSchema = updateProfileSchema.concat(Role);

export default {
  loginUserSchema,
  registerUserSchema,
  registerUserFormSchema,
  updateProfileSchema,
  updatePasswordSchema,
  updateUserSchema,
};
