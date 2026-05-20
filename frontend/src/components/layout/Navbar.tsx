import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useAuth()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/bug.png" alt="Issue Tracker Logo" className="w-9 h-9" />
            <span className="text-xl font-bold text-gray-800">IssueTracker</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-7">
                  <div className='flex gap-2'>
                    <span className='text-lg text-gray-600'>Welcome</span>
                    <span className="text-lg text-gray-900">
                      {user?.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Sign In
                </Link>
                <Link to="/signup" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
