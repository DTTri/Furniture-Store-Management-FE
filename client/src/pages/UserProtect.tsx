import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

//Implementing UserProtect component -> perform user authentication and authorization
export default function UserProtect({
  children,
}: {
  children: React.ReactNode;

}) {
  const nav = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const id = localStorage.getItem("id") || sessionStorage.getItem("id");
  if (id == null || token == null) {
    nav('/login');
    return;
  }
  return (<div>{children}</div>
  )
}
