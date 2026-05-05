import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://apitaikhoan.havuhongphuc1426.id.vn/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdmin', 'true');
        alert("Chào mừng Admin quay trở lại!");
        window.location.href = '/adminhome'; // Chuyển hướng tới trang quản lý
      } else {
        alert("Bạn không có quyền truy cập hoặc sai thông tin!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-600">
        <h2 className="text-3xl font-black text-center text-gray-800 mb-8 tracking-tighter">ADMIN LOGIN</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Admin Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="admin@gmail.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Mật khẩu</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform active:scale-95 transition"
          >
            ĐĂNG NHẬP HỆ THỐNG
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;