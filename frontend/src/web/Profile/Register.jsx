import React, { useState } from 'react';

const Register = () => {
    // 1. Tạo kho chứa dữ liệu người dùng nhập vào
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 2. Hàm xử lý khi bấm nút "Create an account"
  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tự động reload trang khi submit form
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // 3. Đóng gói dữ liệu và GỬI SANG BACKEND
      const response = await fetch('https://apitaikhoan.havuhongphuc1426.id.vn/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        })
      });

      // 4. Lấy câu trả lời từ Server về
      const data = await response.json();

      if (response.ok) { // Nếu Server trả về status 2xx (Thành công)
        alert("Chúc mừng! " + data.message);
        window.location.href = '/login'; // Chuyển thẳng sang trang Login
      } else {
        // Nếu lỗi (ví dụ: Trùng email)
        alert("Lỗi: " + data.message); 
      }

    } catch (error) {
      console.error("Lỗi gọi API:", error);
      alert("Không thể kết nối với Server!");
    }
  };
  return (
    // Container bao phủ toàn màn hình, chứa ảnh nền
    <div 
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw')" }}
    >      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* form đăng ký */}
      <div className="relative z-10 w-full max-w-md p-8 bg-stone-900 rounded-lg shadow-xl border border-stone-900 sm:max-w-md">
        
        {/* Logo và Tiêu đề */}
        <div className="flex justify-center mb-4">
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-white">Create your Account</h2>

        <form onSubmit={handleRegisterSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white">Your email</label>
            <input 
              type="email" 
              required
              className="w-full p-2.5 bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-white outline-none transition"
              placeholder="name@company.com" 
              value={email}
              maxLength={255}
              onChange={(e) => setEmail(e.target.value)} // Cập nhật
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-2.5 bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-white outline-none transition" 
              placeholder="••••••••" 
              value={password}
              maxLength={255}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white">Confirm password</label>
            <input 
              type="password" 
              className="w-full p-2.5 bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-white outline-none transition" 
              placeholder="••••••••" 
              required 
              value={confirmPassword}
              maxLength={255}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Birth Date (Sử dụng CSS Grid để chia 3 cột đều nhau) */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-white">Birth Date</label>
            <div className="grid grid-cols-3 gap-4">
              <select className="bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-white outline-none">
                <option>Day</option>
                {[...Array(31)].map((_, i) => <option key={i}>{i + 1}</option>)}
              </select>
              <select className="bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-white outline-none">
                <option>Month</option>
                {[...Array(12)].map((_, i) => <option key={i}>{i + 1}</option>)}
              </select>
              <select className="bg-stone-900 border border-gray-500 text-white text-sm rounded-lg focus:ring-white outline-none">
                <option>Year</option>
                {/* Render từ năm 2026 lùi về 1926 */}
                {[...Array(100)].map((_, i) => <option key={i}>{2026 - i}</option>)}
              </select>
            </div>
          </div>

          {/* Checkbox Terms */}
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" className="w-4 h-4 bg-stone-900 border border-gray-500 rounded focus:ring-3 focus:ring-blue-300 cursor-pointer" required />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm font-medium text-white cursor-pointer">
              I accept the <a href="#!" className="text-red-600 hover:underline">Terms and Conditions</a>
            </label>
          </div>

          {/* Nút Submit */}
          <button type="submit" className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition">
            Create an account
          </button>

          {/* Nút Đăng nhập */}
          <div className="mt-4 text-sm font-medium text-center text-gray-500">
            <a href="/login" className="text-red-600 hover:underline">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;