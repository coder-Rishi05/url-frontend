import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../Auth/Login'

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default Routing
