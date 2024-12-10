import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Implementing UserProtect component -> perform user authentication and authorization
export default function UserProtect({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = useNavigate();
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJyb2xlIjozLCJzdGFmZklkIjoxfSwiaWF0IjoxNzMzODAwMDgxLCJleHAiOjE3MzYzOTIwODF9.EpIEoz3R3mYCs4yLdVptXivx7GxIReLXKO1NHe3NgfE";
  const id =
    localStorage.getItem("id") ||
    sessionStorage.getItem("id") ||
    "6748663e69355757411d4029";
  useEffect(() => {
    if (id == null || token == null) {
      nav("/login");
    }
  }, [id, token, nav]);
  return <div>{children}</div>;
}
