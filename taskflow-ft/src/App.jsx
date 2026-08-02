import { useContext, useState } from 'react'
import './App.css'
import AllRoutes from './navigation/AllRoutes'

function App() {
  
  return (
    <>
    <div className='min-h-screen flex flex-col'>
        <AllRoutes />
    </div>
    </>
  )
}

export default App
