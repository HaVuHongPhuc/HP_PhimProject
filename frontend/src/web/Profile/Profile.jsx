import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // State quản lý thông tin chỉnh sửa
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const email = localStorage.getItem('userEmail') || "admin@gmail.com";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`https://apitaikhoan.havuhongphuc1426.id.vn/profile/${email}`);
      const data = await response.json();
      if (response.ok) {
        setUserInfo(data);
        setNewBirthDate(data.birthDate || "");
        setNewUsername(data.username || data.email.split('@')[0]);
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://apitaikhoan.havuhongphuc1426.id.vn/profile/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          birthDate: newBirthDate,
          username: newUsername 
        })
      });

      if (response.ok) {
        alert("✨ Cập nhật thông tin thành công!");
        setIsEditing(false);
        fetchProfile();
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden font-sans">
      {/* 1. Lớp hình nền mờ sâu (Deep Blur) */}
      <div 
        className="absolute inset-0 bg-center bg-cover blur-sm brightness-50" 
        style={{ 
          backgroundImage: "url('https://cdn.neowin.com/news/images/uploaded/2023/05/1683747988_background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.jpg')",
          zIndex: -2 
        }}
      ></div>

      {/* 2. Thẻ Profile chính*/}
      <div className="relative w-full max-w-4xl bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row">
        
        {/* Cột trái: Avatar & Tên */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-blue-600/20 to-transparent p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative group">
            <img 
              src={`https://static.vecteezy.com/system/resources/previews/009/267/561/original/user-icon-design-free-png.png`} 
              alt="Avatar" 
              className="w-40 h-40 rounded-3xl border-4 border-blue-500/50 shadow-2xl shadow-blue-500/20 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div className="mt-6 text-center w-full">
            {isEditing ? (
              <input 
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full bg-gray-800 border border-blue-500 rounded-lg py-2 px-3 text-white text-center font-bold text-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">{userInfo?.username || userInfo?.email.split('@')[0]}</h2>
            )}
            <p className="text-blue-400 text-sm mt-2 font-medium tracking-widest uppercase">Thành viên</p>
          </div>
        </div>

        {/* Cột phải: Thông tin chi tiết & Nút bấm */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h3 className="text-white text-lg font-bold mb-8 flex items-center">
              Thông tin tài khoản
            </h3>

            <div className="grid grid-cols-1 gap-8">
              {/* Email (Read Only) */}
              <div className="group">
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Địa chỉ Email</label>
                <div className="bg-gray-800/50 border border-white/5 rounded-xl px-4 py-3 text-gray-300 flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  {userInfo?.email}
                </div>
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Ngày sinh</label>
                <div className={`flex items-center rounded-xl px-4 py-3 border transition-all ${isEditing ? 'bg-gray-800 border-blue-500' : 'bg-gray-800/50 border-white/5'}`}>
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  {isEditing ? (
                    <input 
                      type="date" 
                      value={newBirthDate}
                      onChange={(e) => setNewBirthDate(e.target.value)}
                      className="bg-transparent text-white outline-none w-full"
                    />
                  ) : (
                    <span className="text-white font-semibold">{userInfo?.birthDate || 'Chưa cập nhật'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-wrap gap-4">
            {isEditing ? (
              <>
                <button onClick={handleUpdate} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/30">
                  Lưu dữ liệu
                </button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all">
                  Hủy bỏ
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all border border-white/10 active:scale-95">
                  Chỉnh sửa Profile
                </button>
                <button onClick={() => { window.location.href = '/homepage'; }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-all border border-white/5">
                  Quay về
                </button>
                <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold rounded-xl transition-all border border-red-500/20 shadow-lg hover:shadow-red-500/40">
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;