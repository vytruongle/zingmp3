import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Space } from "antd";

import "./App.css";
import "animate.css";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Discovery from "./pages/contents/Discovery/Discovery";
import Personal from "./pages/contents/Personal/Personal";
import TopTable from "./pages/contents/TopTable/TopTable";
import SongDetail from "./components/SongDetail";
import SearchList from "./components/SearchList";

function App() {
  return (
    <Space>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SideBar />}>
            <Route index element={<Discovery />} />
            <Route path="mymusic" element={<Personal />} />
            <Route path="toptable" element={<TopTable />} />
            <Route path="album/:albumId" element={<SongDetail />} />
            <Route path="search/tat-ca" element={<SearchList />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Space>
  );
}

export default App;
