import * as Yup from 'yup';

export const basicInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Invalid phone number format'
    ),
});

export const skillSchema = Yup.object().shape({
  name: Yup.string()
    .required('Skill name is required')
    .min(2, 'Skill name must be at least 2 characters'),
  level: Yup.string()
    .required('Experience level is required')
    .oneOf(['Beginner', 'Intermediate', 'Expert'], 'Invalid experience level'),
});

export const educationSchema = Yup.object().shape({
  degree: Yup.string().required('Degree name is required'),
  institution: Yup.string().required('University/College name is required'),
  year: Yup.string()
    .required('Year of completion is required')
    .matches(/^\d{4}$/, 'Year must be in YYYY format')
    .test('valid-year', 'Year must be valid', value => {
      if (!value) return false;
      const year = parseInt(value);
      return year >= 1900 && year <= new Date().getFullYear();
    }),
});
