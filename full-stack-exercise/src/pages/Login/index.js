import { Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return(
    <div>
      This is Login component.

      {/* 声明式导航 */}
      <Link to='/article'>Article</Link>

      {/* 编程式导航 */}
      <button onClick={() => navigate('/article')}>Article</button>

      {/* searchParams传参 */}
      <button onClick={() => navigate('/article?id=1&name=Yi')}>Article</button>

      {/* params传参 */}
      {/* <button onClick={() => navigate('/article/1/Yi')}>Article</button> */}
    </div>
  )
}

export default Login;