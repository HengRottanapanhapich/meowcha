import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Authcontext'

function CustomerOnlyRoute({ children }) {
    const { role } = useAuth()

    if (role === 'admin') {
        return <Navigate to="/AdminPanel" replace />
    }

    return children
}

export default CustomerOnlyRoute