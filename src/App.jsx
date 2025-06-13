import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import UrlInput from './pages/UrlInput'
import SubdomainSelector from './pages/SubdomainSelector'
import AiStudio from './pages/AiStudio'
import BonusSelection from './pages/BonusSelection'
import Publish from './pages/Publish'
import BridgePagePreview from './components/BridgePagePreview'
import { AppContextProvider } from './context/AppContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  // Use location to force re-render on route changes
  const location = useLocation();

  return (
    <ErrorBoundary>
      <AppContextProvider>
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/url-input" replace />} />
            <Route path="/url-input" element={<UrlInput />} />
            <Route path="/subdomain" element={<SubdomainSelector />} />
            <Route path="/ai-studio" element={<AiStudio />} />
            <Route path="/bonus-selection" element={<BonusSelection />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/preview/:path" element={<BridgePagePreview />} />
            {/* Fallback route to catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AppContextProvider>
    </ErrorBoundary>
  )
}

// NotFound component to handle 404 errors
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-left mb-6">
          <p className="font-medium text-gray-800 mb-2">Error Details:</p>
          <p className="text-sm text-gray-600 mb-1">Code: NOT_FOUND</p>
          <p className="text-sm text-gray-600 mb-1">ID: cle1::qm7qt-1749578348995-e92dd2f5249d</p>
        </div>
        <a 
          href="/url-input" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default App
