import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://apitaikhoan.havuhongphuc1426.id.vn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        })
      });

      const data = await response.json();

    if (response.ok) {
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userEmail', email); 
    alert("Đăng nhập thành công!");
    window.location.href = '/homepage';
}

    } catch (error) {
      console.error("Lỗi gọi API:", error);
      alert("Không thể kết nối với Server!");
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    
      {/* Form đăng nhập  */}
      <div className="relative z-10 w-full max-w-md bg-stone-900 rounded-lg shadow-xl sm:max-w-md">
        <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
          
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-white md:text-2xl">
            Sign in to your account
          </h1>
          
          <form className="space-y-4 md:space-y-6" onSubmit={handleLoginSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Your email</label>
              <input 
                type="email" 
                className="block w-full p-2.5 bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 outline-none transition" 
                placeholder="name@gmail.com" 
                required 
                value={email}
                maxLength={255}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Password</label>
              <input 
                type="password" 
                placeholder="********" 
                className="block w-full p-2.5 bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 outline-none transition" 
                required 
                value={password}
                maxLength={255}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {/* Hàng ngang: Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input 
                    id="remember" 
                    type="checkbox" 
                    className="w-4 h-4 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:ring-3 focus:ring-blue-300" 
                    required 
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 cursor-pointer">Remember me</label>
                </div>
              </div>
            </div>
            
            {/* Nút Submit */}
            <button 
              type="submit" 
              className="w-full px-5 py-2.5 text-sm font-medium text-center text-white transition bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Log in to your account
            </button>
            
            {/* Nút Đăng ký */}
            <div className="text-sm font-medium text-center text-gray-500">
              <a href="/register" className="text-red-600 hover:underline">Don't have an account?</a>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;