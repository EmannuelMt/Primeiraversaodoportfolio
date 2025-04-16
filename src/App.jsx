import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
           <Route path="/skills" element={<Skills />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
