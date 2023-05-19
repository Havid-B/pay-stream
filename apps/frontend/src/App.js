import Navbar from "./components/Navbar";

import { Route, Routes } from "react-router-dom";
import ExploreVideos from "./pages/Collectibles/ExploreVideos";

import UploadVideo from "./pages/Collectibles/UploadVideo";
import Home from "./pages/Home";

function App() {

  return (
      <body className="stretched device-xl bg-white no-transition">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/explore" element={<ExploreVideos />} />
        </Routes>
      </body>
  );
}

export default App;
