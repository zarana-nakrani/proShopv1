import React from 'react'
// import { Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
        {/* <Route path="/login" component={LoginScreen } /> */}
        {/* <Route path="/register" component={RegisterScreen} /> */}
          <Outlet />
        </Container>
      </main>
      <Footer/>
    </>
  )
}

export default App