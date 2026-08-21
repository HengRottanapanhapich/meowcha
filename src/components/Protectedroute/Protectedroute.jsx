import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Authcontext.jsx'

function ProtectedRoute({ children, requireAdmin }) {
    const { currentUser, role } = useAuth()

    if (!currentUser) {
        return <Navigate to="/Loginpage" replace />
    }

    if (requireAdmin && role !== 'admin') {
        return <Navigate to="/Shoppage" replace />
    }

    return children
}

export default ProtectedRoute