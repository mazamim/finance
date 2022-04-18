import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIscancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
  
    const login = async (email,password) => {
      setError(null);
      setIsPending(true);
  
      //sign the user out
      try {
       const response= await projectAuth.signInWithEmailAndPassword(email,password);
        dispatch({ type: "LOGIN" ,payload:response.user});
  
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
  
    return { login, error, isPending };
  };