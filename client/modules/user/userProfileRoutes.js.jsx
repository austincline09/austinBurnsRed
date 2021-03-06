import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Auth from '../../global/utils/auth';

//components
import UserProfileLayout from './components/UserProfileLayout.js.jsx';
import UserProfile from './components/UserProfile.js.jsx';

//routes
const userProfileRoutes =
<Route key={Math.floor(Math.random()*1000)} path="profile" component={UserProfileLayout} onEnter={Auth.requireLogin}>
  <IndexRoute component={UserProfile}/>

</Route>


export default userProfileRoutes;
