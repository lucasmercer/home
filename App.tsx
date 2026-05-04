/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import HomeSection from './components/sections/HomeSection';
import ComputationalThinking from './components/sections/ComputationalThinking';
import ITSection from './components/sections/ITSection';
import LifeSection from './components/sections/LifeSection';

type SectionId = 'home' | 'computational' | 'tech' | 'life';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'computational':
        return <ComputationalThinking />;
      case 'tech':
        return <ITSection />;
      case 'life':
        return <LifeSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="h-full"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

