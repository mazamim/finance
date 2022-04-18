import { useState,useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIscancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const{dispatch}=useAuthContext()

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
      //dispatch login action
      dispatch({type:'LOGIN',payload:response.user})


    //update state
    if (!isCancelled) {
      setError(null);
      setIsPending(false);
    }
      
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIscancelled(true);
    };
  }, []);

  return { error, isPending, signup };
};
