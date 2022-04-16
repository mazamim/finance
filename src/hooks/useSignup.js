import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response.user);

      if (!response) {
        throw new Error("could not complete signup");
      }

      //add display name
      await response.user.updateProfile({displayName:displayName});
      setIsPending(false)
      setError(null)
      
    } catch (error) {
      console.log(error.message);
      setError(error);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
