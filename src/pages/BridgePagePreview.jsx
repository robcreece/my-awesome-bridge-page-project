import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BridgePagePreview() {
  const { path } = useParams()
  const [pageContent, setPageContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Attempt to load the page content from localStorage
    try {
      const storedContent = localStorage.getItem(`bridge_page_${path}`)
      if (storedContent) {
        setPageContent(storedContent)
      } else {
        setError('Page not found. It may have been deleted or not published yet.')
      }
    } catch (err) {
      console.error('Error loading preview:', err)
      setError('Failed to load preview. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [path])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>Loading preview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Preview Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="bg-white p-4 rounded border border-red-200 text-sm text-left">
            <p className="font-medium mb-2">Troubleshooting steps:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Make sure you've published the page</li>
              <li>Check that the path URL is correct</li>
              <li>Try refreshing the page</li>
              <li>Go back to the publish page and try again</li>
            </ul>
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
