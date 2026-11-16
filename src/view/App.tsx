import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Student from './student/Student.tsx'
import { getStudents } from "../api/request/student.ts";
import ErrorPage from "./erorPage/ErrorPage.tsx";
import Home from "./home/Home.tsx";
import Menu from "./menu/Menu.tsx";
import { getMenus } from "../api/request/menu.ts";


const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    errorElement: <ErrorPage message="test" />,
  },
  {
    path: "student",
    element: <Student />,
    loader: getStudents,
    errorElement: <ErrorPage message="test" />,
  },
  {
    path: "menu",
    element: <Menu />,
    loader: getMenus,
    errorElement: <ErrorPage message="test" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;

}

export default App;