import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Navbar from './components/layout/Navbar'
import AppRoutes from './routes'

function App() {
  return (
    <Router>
      <Navbar/>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        rtl={false}
        theme="light"
      />
      <AppRoutes />
    </Router>
  )
}

export default App
