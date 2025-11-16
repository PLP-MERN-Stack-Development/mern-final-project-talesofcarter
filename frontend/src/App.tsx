import { type JSX } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

function App(): JSX.Element {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Signup />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
