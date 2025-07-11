const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Увійти в My Balance</h2>
      <button className="btn btn-outline-primary" onClick={handleLogin}>
        Увійти через Google
      </button>
    </div>
  );
};

export default Login;