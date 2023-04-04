import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Space } from "antd";

import "./App.css";
import "animate.css";
import Footer from "./pages/Footer/Footer";
import Header from "./pages/Header/Header";
import SideBar from "./pages/SideBar/SideBar";
import Discovery from "./pages/contents/Discovery/Discovery";
import Personal from "./pages/contents/Personal/Personal";
import TopTable from "./pages/contents/TopTable/TopTable";
import SongDetail from "./components/SongDetail";

function App() {
  return (
    <Space>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SideBar />}>
            <Route index element={<Discovery />} />
            <Route path="mymusic" element={<Personal />} />
            <Route path="toptable" element={<TopTable />} />
            <Route path="album/:albumId" element={<SongDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </Space>
  );
}

export default App;
