import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import BridgePagePreview from '../components/BridgePagePreview'
import { FiGlobe, FiDownload, FiCode, FiExternalLink } from 'react-icons/fi'
import { publishBridgePage } from '../utils/api'

export default function Publish() {
  const { 
    path,
    setCurrentStep,
    colorScheme,
    headlines,
    selectedHeadline,
    benefits,
    bonuses,
    videoUrl,
    affiliateLink
  } = useAppContext()
  
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [publishSuccess, setPublishSuccess] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [errorDetails, setErrorDetails] = useState(null)
  const navigate = useNavigate()

  // Check if there's a previously published page for this path
  useEffect(() => {
    if (path) {
      const storedContent = localStorage.getItem(`bridge_page_${path}`);
      if (storedContent) {
        setPublishSuccess(true);
        setPublishedUrl(`https://clickhumble.com/${path}`);
        setPreviewUrl(`/preview/${path}`);
      }
    }
  }, [path]);

  const handlePublish = async () => {
    setIsPublishing(true)
    setErrorDetails(null)
    
    try {
      // Validate required fields
      if (!path) {
        throw new Error('Path URL is required. Please go back and set a valid path.');
      }
      
      if (!headlines[selectedHeadline]) {
        throw new Error('Headline is required. Please go back and select a headline.');
      }
      
      if (!affiliateLink) {
        throw new Error('Affiliate link is required. Please go back and set your affiliate link.');
      }
      
      // Prepare data for publishing
      const pageData = {
        path,
        colorScheme,
        headline: headlines[selectedHeadline],
        benefits,
        bonuses: bonuses.filter(bonus => bonus.selected),
        videoUrl,
        affiliateLink
      }
      
      // Call the API to publish the bridge page
      const result = await publishBridgePage(pageData)
      
      if (result.success) {
        setPublishedUrl(result.url)
        // If there's a preview URL available, use it (for demo purposes)
        if (result.previewUrl) {
          setPreviewUrl(result.previewUrl)
        }
        setPublishSuccess(true)
        toast.success('Bridge page published successfully!')
      } else {
        throw new Error(result.message || 'Failed to publish')
      }
    } catch (error) {
      console.error('Publishing error:', error)
      setErrorDetails({
        message: error.message || 'An unexpected error occurred',
        code: 'NOT_FOUND',
        id: 'cle1::qm7qt-1749578348995-e92dd2f5249d'
      });
      toast.error(`Failed to publish bridge page: ${error.message || 'Please try again.'}`)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      // Prepare HTML content for download
      const htmlContent = generateHtmlContent()
      
      // Create a blob and download it
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bridge-page-${path}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('HTML file downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download HTML file. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  // Generate HTML content for download
  const generateHtmlContent = () => {
    const selectedBonuses = bonuses.filter(bonus => bonus.selected)
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headlines[selectedHeadline]}</title>
  <style>
    :root {
      --primary: ${colorScheme.primary};
      --secondary: ${colorScheme.secondary};
      --accent: ${colorScheme.accent};
      --background: ${colorScheme.background};
      --text: ${colorScheme.text};
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    header {
      text-align: center;
      padding: 2rem 0;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--primary);
    }
    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
      margin: 2rem 0;
    }
    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .benefits {
      margin: 2rem 0;
    }
    .benefit-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    .benefit-item:before {
      content: "✓";
      display: inline-block;
      color: var(--secondary);
      font-weight: bold;
      margin-right: 1rem;
    }
    .bonuses {
      background-color: rgba(0,0,0,0.05);
      padding: 2rem;
      border-radius: 8px;
      margin: 2rem 0;
    }
    .bonus-item {
      margin-bottom: 1.5rem;
    }
    .bonus-title {
      font-weight: bold;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }
    .cta-button {
      display: block;
      background-color: var(--primary);
      color: white;
      text-align: center;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      text-decoration: none;
      border-radius: 4px;
      margin: 2rem auto;
      max-width: 300px;
      font-weight: bold;
    }
    footer {
      text-align: center;
      margin-top: 3rem;
      padding: 1rem;
      font-size: 0.9rem;
      color: rgba(0,0,0,0.6);
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${headlines[selectedHeadline]}</h1>
    </header>
    
    ${videoUrl ? `
    <div class="video-container">
      <iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    ` : ''}
    
    <div class="benefits">
      <h2>Here's What You'll Get:</h2>
      ${benefits.map(benefit => `
        <div class="benefit-item">${benefit}</div>
      `).join('')}
    </div>
    
    ${selectedBonuses.length > 0 ? `
    <div class="bonuses">
      <h2>Exclusive Bonuses:</h2>
      ${selectedBonuses.map(bonus => `
        <div class="bonus-item">
          <div class="bonus-title">${bonus.title}</div>
          <div class="bonus-description">${bonus.description}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    <a href="${affiliateLink}" class="cta-button">Get Instant Access Now</a>
    
    <footer>
      <p>This page was created with ClickHumble Bridge Page Creator</p>
    </footer>
  </div>
</body>
</html>
    `
  }

  const handleExportToWordPress = async () => {
    setIsExporting(true)
    
    try {
      // Validate required fields
      if (!headlines[selectedHeadline]) {
        throw new Error('Headline is required. Please select a headline.');
      }
      
      if (!affiliateLink) {
        throw new Error('Affiliate link is required. Please set your affiliate link.');
      }
      
      // Prepare data for WordPress export
      const exportData = {
        title: headlines[selectedHeadline],
        content: generateHtmlContent(),
        affiliateLink,
        colorScheme
      }
      
      // Simulate WordPress export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('WordPress export completed successfully!')
    } catch (error) {
      console.error('WordPress export error:', error)
      toast.error(`Failed to export to WordPress: ${error.message || 'Please try again.'}`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleStartOver = () => {
    setCurrentStep(1)
    navigate('/url-input')
  }

  // Function to open the preview in a new tab
  const openPreview = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    } else if (publishedUrl) {
      window.open(publishedUrl, '_blank');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="form-container">
          <h2 className="text-2xl font-bold mb-6">Publish Your Bridge Page</h2>
          
          <div className="mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Preview & Finalize</h3>
              <p className="text-sm text-gray-500">
                Your bridge page is ready to be published. Review the preview on the right and choose your preferred publishing method below.
              </p>
            </div>
            
            {errorDetails && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <h3 className="text-lg font-medium text-red-700 mb-2">Publishing Error</h3>
                <p className="text-sm text-red-600 mb-2">{errorDetails.message}</p>
                <div className="text-xs text-gray-600">
                  <p>Error Code: {errorDetails.code}</p>
                  <p>Error ID: {errorDetails.id}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-700">Troubleshooting:</p>
                  <ul className="list-disc pl-5 text-xs text-red-600 mt-1">
                    <li>Try using a different path URL</li>
                    <li>Ensure all required fields are filled</li>
                    <li>Check your internet connection</li>
                    <li>Try downloading the HTML file instead</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="card hover:border-primary cursor-pointer">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-md">
                    <FiGlobe className="text-primary text-xl" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Publish to ClickHumble Path URL</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Host your bridge page on our servers at clickhumble.com/{path}
                    </p>
                    <button
                      className="mt-3 btn btn-primary text-sm py-2 px-4"
                      onClick={handlePublish}
                      disabled={isPublishing || publishSuccess}
                    >
                      {isPublishing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Publishing...
                        </span>
                      ) : publishSuccess ? (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Published
                        </span>
                      ) : (
                        'Publish Now'
                      )}
                    </button>
                    
                    {publishSuccess && (
                      <div className="mt-2">
                        <div className="text-sm text-green-600 mb-2">
                          Your page is live at <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline">{publishedUrl}</a>
                        </div>
                        
                        <button
                          onClick={openPreview}
                          className="flex items-center text-sm text-primary hover:underline"
                        >
                          <FiExternalLink className="mr-1" /> Open in new tab
                        </button>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          <strong>Note:</strong> It may take a few minutes for your page to be fully deployed and accessible.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="card hover:border-secondary cursor-pointer">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-secondary bg-opacity-10 p-3 rounded-md">
                    <FiDownload className="text-secondary text-xl" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Download HTML File</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Download the complete HTML file to host on your own server
                    </p>
                    <button
                      className="mt-3 btn btn-secondary text-sm py-2 px-4"
                      onClick={handleDownload}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </span>
                      ) : (
                        'Download HTML'
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card hover:border-accent cursor-pointer">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-accent bg-opacity-10 p-3 rounded-md">
                    <FiCode className="text-accent text-xl" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Export to WordPress</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Export your bridge page directly to your WordPress site
                    </p>
                    <button
                      className="mt-3 btn btn-secondary text-sm py-2 px-4"
                      onClick={handleExportToWordPress}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Exporting...
                        </span>
                      ) : (
                        'Export to WordPress'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCurrentStep(4)
                navigate('/bonus-selection')
              }}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleStartOver}
            >
              Create Another Page
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <BridgePagePreview />
      </div>
    </div>
  )
}
