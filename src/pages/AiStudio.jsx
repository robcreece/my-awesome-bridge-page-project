import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import BridgePagePreview from '../components/BridgePagePreview'
import { FiRefreshCw, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function AiStudio() {
  const { 
    salesPageUrl,
    scrapedData,
    headlines, 
    setHeadlines,
    selectedHeadline,
    setSelectedHeadline,
    benefits,
    setBenefits,
    videoUrl,
    setVideoUrl,
    affiliateLink,
    setAffiliateLink,
    setCurrentStep
  } = useAppContext()
  
  const [isGeneratingHeadlines, setIsGeneratingHeadlines] = useState(false)
  const [isGeneratingBenefits, setIsGeneratingBenefits] = useState(false)
  const navigate = useNavigate()

  const handleGenerateHeadlines = async () => {
    setIsGeneratingHeadlines(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock AI-generated headlines
      const newHeadlines = [
        `Stop Struggling With Affiliate Marketing - ${scrapedData?.title || 'This System'} Changes Everything`,
        `The Fastest Way To Generate Affiliate Commissions Without Technical Skills`,
        `How This Revolutionary ${scrapedData?.title || 'System'} Is Helping Ordinary People Make Extraordinary Commissions`
      ]
      
      setHeadlines(newHeadlines)
      toast.success('New headlines generated!')
    } catch (error) {
      toast.error('Failed to generate headlines. Please try again.')
    } finally {
      setIsGeneratingHeadlines(false)
    }
  }

  const handleGenerateBenefits = async () => {
    setIsGeneratingBenefits(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock AI-generated benefits
      const newBenefits = [
        'Get started in under 10 minutes with our step-by-step setup wizard',
        'Increase your conversion rates by up to 300% with our proven templates',
        'No technical skills required - our system does all the heavy lifting',
        'Works with any affiliate network including WarriorPlus, JVZoo, and ClickBank',
        'Full 24/7 support and regular updates included at no extra cost'
      ]
      
      setBenefits(newBenefits)
      toast.success('New benefits generated!')
    } catch (error) {
      toast.error('Failed to generate benefits. Please try again.')
    } finally {
      setIsGeneratingBenefits(false)
    }
  }

  const handleAddBenefit = () => {
    setBenefits([...benefits, ''])
  }

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits]
    newBenefits[index] = value
    setBenefits(newBenefits)
  }

  const handleRemoveBenefit = (index) => {
    const newBenefits = benefits.filter((_, i) => i !== index)
    setBenefits(newBenefits)
  }

  const handleContinue = () => {
    if (!affiliateLink) {
      toast.warning('Please enter your affiliate link before continuing.')
      return
    }
    
    setCurrentStep(4)
    navigate('/bonus-selection')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="form-container">
          <h2 className="text-2xl font-bold mb-6">AI Content Studio</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">Headlines</h3>
              <button 
                className="text-sm flex items-center text-primary hover:text-primary-dark"
                onClick={handleGenerateHeadlines}
                disabled={isGeneratingHeadlines}
              >
                <FiRefreshCw className={`mr-1 ${isGeneratingHeadlines ? 'animate-spin' : ''}`} />
                {isGeneratingHeadlines ? 'Generating...' : 'Regenerate'}
              </button>
            </div>
            
            {headlines.map((headline, index) => (
              <div 
                key={index}
                className={`p-3 border rounded-md mb-2 cursor-pointer hover:border-primary transition-colors ${selectedHeadline === index ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200'}`}
                onClick={() => setSelectedHeadline(index)}
              >
                <p className={selectedHeadline === index ? 'font-medium' : ''}>
                  {headline}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">Benefits</h3>
              <div className="flex items-center">
                <button 
                  className="text-sm flex items-center text-primary hover:text-primary-dark mr-2"
                  onClick={handleGenerateBenefits}
                  disabled={isGeneratingBenefits}
                >
                  <FiRefreshCw className={`mr-1 ${isGeneratingBenefits ? 'animate-spin' : ''}`} />
                  {isGeneratingBenefits ? 'Generating...' : 'Regenerate'}
                </button>
                <button 
                  className="text-sm flex items-center text-primary hover:text-primary-dark"
                  onClick={handleAddBenefit}
                >
                  <FiPlus className="mr-1" />
                  Add
                </button>
              </div>
            </div>
            
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  className="input-field mb-0"
                  placeholder="Enter benefit"
                />
                <button 
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={() => handleRemoveBenefit(index)}
                  disabled={benefits.length <= 1}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Video & CTA</h3>
            
            <div className="mb-4">
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Video URL (optional)
              </label>
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="input-field"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Add a video to increase engagement and conversions.
              </p>
            </div>
            
            <div>
              <label htmlFor="affiliateLink" className="block text-sm font-medium text-gray-700 mb-1">
                Your Affiliate Link
              </label>
              <input
                type="url"
                id="affiliateLink"
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
                className="input-field"
                placeholder="https://warriorplus.com/o2/a/..."
              />
              <p className="text-sm text-gray-500 mt-1">
                This is where visitors will be sent when they click your CTA button.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCurrentStep(2)
                navigate('/subdomain')
              }}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleContinue}
            >
              Continue
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
