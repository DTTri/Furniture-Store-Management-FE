import React from 'react'
import { Navigate } from 'react-router-dom';

//Implementing UserProtect component -> perform user authentication and authorization
export default function UserProtect({
  children,
}: {
  children: React.ReactNode;

}) {
  // const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  // if(!token) {
  //   return <Navigate to={`/login`}></Navigate>
  // }
  return (<div>{children}</div>
  )
}
