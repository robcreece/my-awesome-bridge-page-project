import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import BridgePagePreview from '../components/BridgePagePreview'
import EffortMeter from '../components/EffortMeter'
import { FiRefreshCw } from 'react-icons/fi'

export default function BonusSelection() {
  const { 
    bonuses, 
    setBonuses,
    setCurrentStep
  } = useAppContext()
  
  const [isGeneratingBonuses, setIsGeneratingBonuses] = useState(false)
  const [effortFilter, setEffortFilter] = useState(0) // 0 means no filter
  const navigate = useNavigate()

  const handleGenerateBonuses = async () => {
    setIsGeneratingBonuses(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock AI-generated bonuses
      const newBonuses = [
        {
          id: 1,
          title: 'Affiliate Marketing Quickstart Guide',
          description: 'A comprehensive PDF guide to help you get started with affiliate marketing in just 24 hours.',
          effort: 2,
          selected: true
        },
        {
          id: 2,
          title: '50 High-Converting Email Templates',
          description: 'Copy-paste email templates specifically designed for affiliate promotions.',
          effort: 1,
          selected: true
        },
        {
          id: 3,
          title: 'Traffic Generation Masterclass',
          description: 'A 5-part video series showing you how to drive targeted traffic to your affiliate offers.',
          effort: 4,
          selected: false
        },
        {
          id: 4,
          title: 'Affiliate Disclaimer Generator',
          description: 'Create legally compliant affiliate disclaimers with just a few clicks.',
          effort: 1,
          selected: true
        },
        {
          id: 5,
          title: 'Conversion Rate Optimization Checklist',
          description: '27-point checklist to maximize your affiliate page conversions.',
          effort: 2,
          selected: true
        }
      ]
      
      setBonuses(newBonuses)
      toast.success('New bonus ideas generated!')
    } catch (error) {
      toast.error('Failed to generate bonus ideas. Please try again.')
    } finally {
      setIsGeneratingBonuses(false)
    }
  }

  const handleToggleBonus = (id) => {
    const newBonuses = bonuses.map(bonus => 
      bonus.id === id ? { ...bonus, selected: !bonus.selected } : bonus
    )
    setBonuses(newBonuses)
  }

  const filteredBonuses = effortFilter === 0 
    ? bonuses 
    : bonuses.filter(bonus => bonus.effort <= effortFilter)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="form-container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Bonus Selection</h2>
            <button 
              className="text-sm flex items-center text-primary hover:text-primary-dark"
              onClick={handleGenerateBonuses}
              disabled={isGeneratingBonuses}
            >
              <FiRefreshCw className={`mr-1 ${isGeneratingBonuses ? 'animate-spin' : ''}`} />
              {isGeneratingBonuses ? 'Generating...' : 'Generate New Ideas'}
            </button>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Effort Level
            </label>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${effortFilter === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setEffortFilter(0)}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${effortFilter === 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setEffortFilter(1)}
              >
                Low Effort
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${effortFilter === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setEffortFilter(2)}
              >
                Medium Effort
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${effortFilter === 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setEffortFilter(3)}
              >
                High Effort
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Available Bonuses</h3>
            <p className="text-sm text-gray-500 mb-4">
              Select the bonuses you want to include with your affiliate offer. We recommend 3-5 bonuses for optimal conversion.
            </p>
            
            {filteredBonuses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No bonuses match your current filter. Try adjusting the effort level or generate new ideas.
              </div>
            ) : (
              filteredBonuses.map(bonus => (
                <div 
                  key={bonus.id}
                  className={`bonus-card ${bonus.selected ? 'selected' : ''}`}
                  onClick={() => handleToggleBonus(bonus.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{bonus.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{bonus.description}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Effort:</span>
                        <EffortMeter level={bonus.effort} />
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className={`w-5 h-5 rounded-full border ${bonus.selected ? 'bg-secondary border-secondary' : 'border-gray-300'} flex items-center justify-center`}>
                        {bonus.selected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCurrentStep(3)
                navigate('/ai-studio')
              }}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setCurrentStep(5)
                navigate('/publish')
              }}
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
