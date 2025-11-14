import { type JSX } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App(): JSX.Element {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
