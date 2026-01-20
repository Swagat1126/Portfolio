import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <footer className="text-center py-6 bg-gray-900 text-gray-500">
          <p>© 2025 Swagat Koreti. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

export default App;