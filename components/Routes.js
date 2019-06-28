import React, { useState, useEffect } from 'react'
import { Router, Scene, Stack, Drawer, ActionConst } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home.js'
import About from './About.js'
import AddUser from './AddUser.js'
import ViewUsers from './ViewUsers.js'
import SplashScreen from '../splash/splashInit'
import AddSubscription from '../container/AddSubscription'
import DefaultDrawer from './Drawer';

const Routes = () => {
   const [ isLoading, setIsLoading ] = useState(true)

   useEffect(() =>  {
      var timer = setTimeout(
          () => { setIsLoading(false) },
          2000
      )
      return () => {
         clearTimeout(timer)
      }
  })

  const MenuIcon = () => (
   <Icon.Button name="facebook" solid>
   </Icon.Button>
  )

  if (isLoading)
      return <SplashScreen />

   return (
      <Router>
         
            <Stack key = "root">
            
               <Scene key = "home" component = {Home} title = "Home" initial = {true} hideNavBar={true} />
               <Drawer key="drawer" drawer contentComponent={DefaultDrawer} drawerWidth={220} >   
               <Scene key = "donate" component = {AddSubscription} title = "Donate Us" />
               <Scene key = "addUser" component = {AddUser} title = "Add User" />
               <Scene key = "viewUsers" component = {ViewUsers} title = "View Users" />
               </Drawer>
            </Stack>
         
      </Router>
   )
}
export default Routes

