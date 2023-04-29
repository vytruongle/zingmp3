import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Discovery from "../pages/contents/Discovery/Discovery";
import Personal from "../pages/contents/Personal/Personal";
import TopTable from "../pages/contents/TopTable/TopTable";
import SongDetail from "../components/SongDetail";
import SearchList from "../components/SearchList";
import Register from "../pages/contents/Register";
import Login from "../pages/contents/Login";

const Router = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Discovery />,
        },
        {
          path: "mymusic",
          element: <Personal />,
        },
        {
          path: "toptable",
          element: <TopTable />,
        },
        {
          path: "album/:albumId",
          element: <SongDetail />,
        },
        {
          path: "search/tat-ca",
          element: <SearchList />,
        },
        // {
        //   path: "/user",
        //   element: <User />,
        // },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return element;
};

export default Router;
