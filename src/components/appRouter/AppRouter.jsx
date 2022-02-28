import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../routing/constants'

function AppRouter() {
  return (
    <div className='container'>
      <Routes>
        {ROUTES.map(({path, component}) => 
            <Route key={path} path={ path } element={ component} exact />
        )}
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </div> 
  )
}

export default AppRouter