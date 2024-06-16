import { Navbar } from "components/navbar";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
