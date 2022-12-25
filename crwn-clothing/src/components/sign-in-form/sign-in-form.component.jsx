import { useState } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.componet";
import FormInput from "../form-input/form-input.component";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../routes/utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => await signInWithGooglePopup();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for the e-mail");
          break;
        case "auth/user-not-found":
          alert("no user associated with this e-mail");
          break;
        default:
          console.log(error);
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
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
            type="button"
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
