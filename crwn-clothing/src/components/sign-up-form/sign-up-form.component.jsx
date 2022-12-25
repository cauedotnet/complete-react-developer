import { useState } from "react";

import Button from "../button/button.componet";
import FormInput from "../form-input/form-input.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../routes/utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, e-mail already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          onChange={handleChange}
          required
          type="text"
          value={displayName}
        />
        <FormInput
          label="Email"
          name="email"
          onChange={handleChange}
          required
          type="email"
          value={email}
        />
        <FormInput
          label="Password"
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          required
          type="password"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
