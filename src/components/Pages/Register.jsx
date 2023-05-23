import { useFormik } from 'formik';
import * as Yup from 'yup';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const StyledMain = styled.main`
  min-height: calc(100vh - 320px);
  padding-top: 120px;
`

const Register = () => {

  const navigate = useNavigate();
  const { setUsers, UsersActionTypes } = useContext(UsersContext);

  const values = {
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    picture: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Hey! Input must be a valid email.')
      .trim()
      .required('Input must be filled!'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,20}$/,
        "Must Contain at least 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
      )
      .trim()
      .required('Input must be filled!'),
    passwordConfirm: Yup.mixed()
      .oneOf([Yup.ref('password'), null], 'Passwords does not match.')
      .required('Input must be filled!'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 symbols.')
      .max(15, 'Username must be at most 15 symbols.')
      .trim()
      .required('Hey! You need a username for this.'),
    picture: Yup.string()
      .url('This field must be a valid URL.')
      .trim(),
    });

    const formik = useFormik({
      initialValues: values,
      validationSchema: validationSchema,
      onSubmit: (data) => {
        setUsers({
          type: UsersActionTypes.add,
          data: data
        });
        navigate('/');
      }
    });

  return (
    <StyledMain>
      <h1>Registration form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            name="email" id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
          />
          {
            formik.touched.email && formik.errors.email && 
            <p
              style={{ color: 'red' }}
            >{formik.errors.email}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            name="password" id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.password}</p>
          }
        </div>
        <div>
          <label htmlFor="passwordConfirm">Repeat the password:</label>
          <input 
            type="password"
            name="passwordConfirm" id="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.passwordConfirm && formik.errors.passwordConfirm &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.passwordConfirm}</p>
          }
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text"
            name="username" id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.username && formik.errors.username &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.username}</p>
          }
        </div>
        <div>
          <label htmlFor="picture">Avatar URL:</label>
          <input 
            type="url"
            name="picture" id="picture"
            value={formik.values.picture}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.picture && formik.errors.picture &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.picture}</p>
          }
        </div>
        <button type="submit">Register</button>
      </form>
    </StyledMain>
  );
}
 
export default Register;