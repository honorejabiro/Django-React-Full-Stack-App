import React from 'react'
import Form from "../components/Form.jsx"
const Login = () => {
  return (
    <Form route="api/token/" method="login" />
  )
}

export default Login
