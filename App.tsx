import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <Contact />
    </Layout>
  );
};

export default App;