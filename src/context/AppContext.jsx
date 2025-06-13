import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export function AppContextProvider({ children }) {
  const [salesPageUrl, setSalesPageUrl] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [path, setPath] = useState('')
  const [scrapedData, setScrapedData] = useState(null)
  const [manualInput, setManualInput] = useState(false)
  const [colorScheme, setColorScheme] = useState({
    primary: '#4f46e5',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1f2937'
  })
  const [headlines, setHeadlines] = useState([
    'Transform Your [Niche] Results With This Groundbreaking [Product]',
    'Stop Struggling With [Pain Point] - [Product] Changes Everything',
    'The [Adjective] Way To [Benefit] Without [Pain Point]'
  ])
  const [selectedHeadline, setSelectedHeadline] = useState(0)
  const [benefits, setBenefits] = useState([
    'Save hours of time with our automated system',
    'Increase your conversion rates by up to 300%',
    'No technical skills required - easy to use interface',
    'Get results in as little as 24 hours',
    'Full support and training included'
  ])
  const [bonuses, setBonuses] = useState([
    {
      id: 1,
      title: 'Ultimate Affiliate Marketing Cheat Sheet',
      description: 'A quick reference guide with all the best practices for affiliate marketing success.',
      effort: 2,
      selected: true
    },
    {
      id: 2,
      title: 'Email Swipe File Collection',
      description: '25 proven email templates you can use to promote any affiliate product.',
      effort: 1,
      selected: true
    },
    {
      id: 3,
      title: 'Conversion Rate Optimization Guide',
      description: 'Learn how to double your conversion rates with these simple tweaks.',
      effort: 3,
      selected: false
    },
    {
      id: 4,
      title: 'Traffic Generation Masterclass',
      description: '5-part video series showing you how to drive targeted traffic to your offers.',
      effort: 4,
      selected: false
    },
    {
      id: 5,
      title: 'Affiliate Disclaimer Templates',
      description: 'Legal templates to keep your affiliate business compliant and protected.',
      effort: 1,
      selected: true
    }
  ])
  const [videoUrl, setVideoUrl] = useState('')
  const [affiliateLink, setAffiliateLink] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [previewDevice, setPreviewDevice] = useState('desktop')

  const value = {
    salesPageUrl,
    setSalesPageUrl,
    subdomain,
    setSubdomain,
    path,
    setPath,
    scrapedData,
    setScrapedData,
    manualInput,
    setManualInput,
    colorScheme,
    setColorScheme,
    headlines,
    setHeadlines,
    selectedHeadline,
    setSelectedHeadline,
    benefits,
    setBenefits,
    bonuses,
    setBonuses,
    videoUrl,
    setVideoUrl,
    affiliateLink,
    setAffiliateLink,
    currentStep,
    setCurrentStep,
    previewDevice,
    setPreviewDevice
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
