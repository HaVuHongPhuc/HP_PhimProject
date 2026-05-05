
import React, { useState, useEffect } from 'react';
import Layout from './layout';
const HomePage = () => {
  //tạo kho chứa phim useState
  const [movies, setMovies] = useState([]);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMovieClick = (movie) => {
  // 1. Kiểm tra trong túi (localStorage) xem có vé 'userToken' chưa
  const isLoggedin = localStorage.getItem('userToken');

  // 2. Nếu chưa có vé (chưa đăng nhập)
  if (!isLoggedin) {
    alert("Bạn cần đăng nhập để xem phim nhé!");
    // Chuyển hướng người dùng sang trang login
    window.location.href = '/login';
    return; 
  }
  // 3. Nếu đã có vé rồi thì bật video
  setPlayingMovie(movie);
};

  useEffect(() => {
    // Tạo một hàm bất đồng bộ (async)
    const getMoviesFromServer = async () => {
        const response = await fetch('https://20252026apidoanphimhk2huflit.havuhongphuc1426.id.vn/movies');       
        //chuyển đổi sang json
        const data = await response.json();
        setMovies(data);
    };
    getMoviesFromServer();
  }, []);

 const filteredMovies = movies.filter((movie) => {
    if (searchTerm === "") return true;
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
  {/* 1. Lớp hình nền: Được tách riêng để áp dụng hiệu ứng mờ */}
  <div 
    className="absolute inset-0 bg-center bg-cover blur-sm" 
    style={{ 
      backgroundImage: "url('https://cdn.neowin.com/news/images/uploaded/2023/05/1683747988_background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.jpg')",
      zIndex: -2 
    }}
  ></div>

      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold text-white">Danh sách phim</h1>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            
            {/* Lặp qua danh sách phim */}
            {filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                
                <div key={movie.id} className="bg-black rounded-lg shadow-lg cursor-pointer hover:ring-2
                 hover:ring-indigo-500 transition" onClick={() => handleMovieClick(movie)}>
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="object-cover w-full h-48 sm:h-64 border border-black " 
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-white truncate">{movie.title}</h3>
                  </div>
                </div>
              ))
            ) : (
               <div className="text-gray-400 col-span-full">Chưa có bộ phim nào trong Database.</div>
            )}
          </div>
      </div>{/* xem phim (Chỉ hiện khi playingMovie có dữ liệu) */}
          {playingMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
        <div className="relative w-full max-w-5xl p-4">
      
      {/* Nút đóng */}
      <button
        onClick={() => setPlayingMovie(null)}
        className="absolute z-10 px-4 py-2 text-white bg-red-600 rounded-md -top-10 right-4 hover:bg-red-700"
      >
        Đóng (X)
      </button>

      {/* Thẻ Video HTML5 */}
      <div className="relative w-full overflow-hidden bg-black rounded-lg shadow-2xl aspect-video">
        <video
          controls // Hiện thanh tiến trình, nút play/pause, âm lượng
          autoPlay // Tự động chạy khi mở lên
          className="w-full h-full"
          src={playingMovie.url} 
        >
        </video>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-white">{playingMovie.title}</h2>
    </div>
  </div>
  )}
    </div>
    </Layout>
  )
}
export default HomePage;