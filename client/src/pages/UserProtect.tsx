import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//Implementing UserProtect component -> perform user authentication and authorization
export default function UserProtect({
  children,
}: {
  children: React.ReactNode;

}) {
  const nav = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const id = localStorage.getItem("id") || sessionStorage.getItem("id");
  useEffect(() => {
    if (id == null || token == null) {
      nav('/login');
    }
  }, [id, token, nav]);
  return (<div>{children}</div>
  )
}
