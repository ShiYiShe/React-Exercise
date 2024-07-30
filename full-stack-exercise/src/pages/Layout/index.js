import { useNavigate, Outlet } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return(
    <div>
      This is Layout.
      <button onClick={() => navigate('/')}>About</button>
      <button onClick={() => navigate('/board')}>Board</button>
      <Outlet />
    </div>
  )
}

export default Layout;