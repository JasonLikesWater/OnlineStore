import Message from "./message";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Layout/Header/navBar.tsx";
import DetailsPage from "./Components/Pages/ProductDetailsPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Message />} />
        <Route path="/Pages" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
