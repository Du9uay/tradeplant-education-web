import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import PlatformOverviewPage from './pages/course/PlatformOverviewPage';
import ShopTypesPage from './pages/course/ShopTypesPage';
import EntryProcessPage from './pages/course/EntryProcessPage';
import QualificationsFeesPage from './pages/course/QualificationsFeesPage';
import CourseTestPage from './pages/CourseTestPage';


const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen text-white page-bg">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/platform-overview" element={<PlatformOverviewPage />} />
            <Route path="/course/shop-types" element={<ShopTypesPage />} />
            <Route path="/course/entry-process" element={<EntryProcessPage />} />
            <Route path="/course/qualifications-fees" element={<QualificationsFeesPage />} />
            <Route path="/course-test" element={<CourseTestPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App; 