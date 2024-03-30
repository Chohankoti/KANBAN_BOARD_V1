import React, { lazy, Suspense } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactLoading from "react-loading";

const NavBar = lazy(() => wait(500).then(()=>import('./Components/NavBar')));
const Dashboard = lazy(() => wait(500).then(()=> import('./Components/Pages/Dashboard')));
const Kanban = lazy(() => wait(500).then(()=> import('./Components/Pages/Kanban')));
const Members = lazy(() => wait(500).then(()=> import('./Components/Pages/Members')));
const CCode = lazy(() => wait(500).then(()=> import('./Components/Pages/CCode')));
const Contact = lazy(() => wait(500).then(()=> import('./Components/Pages/Contact')));
const Login = lazy(() => wait(500).then(()=> import('./Components/Pages/Login')));
const Register = lazy(() => wait(500).then(()=> import('./Components/Pages/Register')));
const ViewMessages = lazy(() => wait(500).then(()=> import('./Components/Pages/ViewMessages')));

const AddMember = lazy(() => wait(500).then(()=> import('./Components/Operations/AddMember')))


function App() {
  const notify = () => {
    toast.success('Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce, // Use Bounce transition
    });

    toast.warn('Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    toast.error('Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <BrowserRouter>
        <Suspense fallback={ 
        <div className="flex justify-center items-center h-screen">
          <ReactLoading type="spinningBubbles" color="#0000FF" />
        </div>
        }>
          <Routes>
            <Route path='/' element={<NavBar/>}>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/kanban' element={<Kanban/>}/>
              <Route path='/members' element={<Members/>}/>
              <Route path='/addmember' element={<AddMember/>}/>
              <Route path='/ccode' element={<CCode/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/msg' element={<ViewMessages/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}