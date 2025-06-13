import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function BridgePagePreview() {
  const { path } = useParams()
  const [pageContent, setPageContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Attempt to load the page content from localStorage
    try {
      // If no path is provided, show an error
      if (!path) {
        setError('No path specified. Please provide a valid path.');
        setLoading(false);
        return;
      }

      const storedContent = localStorage.getItem(`bridge_page_${path}`)
      
      if (storedContent) {
        setPageContent(storedContent)
        setLoading(false)
      } else {
        // If we can't find the content in localStorage, check if we're in the preview route
        // and redirect to a custom error page if needed
        if (window.location.pathname.startsWith('/preview/')) {
          setError('Page not found. It may have been deleted or not published yet.');
        } else {
          // For the preview component in the Publish page, just show a placeholder
          setPageContent(generatePlaceholderContent(path));
        }
        setLoading(false)
      }
    } catch (err) {
      console.error('Error loading preview:', err)
      setError(`Failed to load preview: ${err.message}`)
      setLoading(false)
    }
  }, [path, navigate])

  // Generate placeholder content for the preview pane
  const generatePlaceholderContent = (pathValue) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bridge Page Preview</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
            color: #1f2937;
            line-height: 1.6;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
          }
          h1 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #4f46e5;
          }
          .preview-box {
            background-color: white;
            border: 1px dashed #d1d5db;
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
          }
          .path {
            font-weight: bold;
            color: #4f46e5;
          }
          .btn {
            display: inline-block;
            background-color: #4f46e5;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Bridge Page Preview</h1>
          <p>This is a preview of how your bridge page will look when published.</p>
          <div class="preview-box">
            <p>Your page will be published at:</p>
            <p class="path">clickhumble.com/${pathValue || 'your-path'}</p>
            <p>Click "Publish Now" to make your page live.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Handle retry button click
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    
    // Attempt to reload the content
    try {
      const storedContent = localStorage.getItem(`bridge_page_${path}`);
      if (storedContent) {
        setPageContent(storedContent);
      } else {
        setError('Page not found. It may have been deleted or not published yet.');
      }
    } catch (err) {
      setError(`Failed to load preview: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle go back button click
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Preview Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          
          <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm text-left mb-6">
            <p className="font-medium mb-2">Troubleshooting steps:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Make sure you've published the page</li>
              <li>Check that the path URL is correct</li>
              <li>Try refreshing the page</li>
              <li>Go back to the publish page and try again</li>
            </ul>
            
            <div className="mt-4 text-xs text-gray-500">
              <p>Error ID: cle1::qm7qt-1749578348995-e92dd2f5249d</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render the HTML content in an iframe for isolation
  return (
    <div className="h-screen w-full">
      <iframe
        srcDoc={pageContent}
        title="Bridge Page Preview"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
