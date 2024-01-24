import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import HeaderComponent from './apps/layout/header';
import AboutComponent from './apps/pages/about';
import HomeComponent from './apps/pages/home';
import OurPartnerComponent from './apps/pages/partners';
import DashboardComponent from './apps/pages/dashboard';
import Page404Component from './apps/shared/page404';
import AddUserComponent from './apps/admin/userManagement/addUser';
import PolicyComponent from './apps/admin/userManagement/policy';
import CommonFormDialog from './apps/shared/common_dailog';


function App() {
  return (
    <>
    {/* <div> */}
      <Router>
        {/* <Link to="">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/ourpartner">Our Partners</Link>
        <Link to="/dashboard">Dashboard</Link> */}
        <HeaderComponent/>
    
        <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/about" element={<AboutComponent />}></Route>
        <Route path="/ourpartner" element={<OurPartnerComponent />}></Route>
        <Route path="/dashboard" element={<DashboardComponent />}></Route>
        <Route path="/dashboard" element={<DashboardComponent />}></Route>
        <Route path="/adduser" element={<AddUserComponent />}></Route>
        <Route path="/adduser:id" element={<AddUserComponent />}></Route>  {/* if you want to move with id  */} 
        <Route path="/policy" element={<PolicyComponent />}></Route>
        <Route path="/policy:id" element={<PolicyComponent />}></Route>  

        {/* <Route path="/*" element={<Page404Component />}></Route>   this line of code to rediect to  Page404Component*/}
        {/* if you want to move another page not Page404Component */}   <Route path="/*" element={<Navigate to='/' />}></Route>
        </Routes>
      </Router>
      {/* <CommonFormDialog /> */}
      {/* <FooterComponent/>  */}
    {/* </div> */}
    </>
  );
}

export default App;
