import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function StepIndicator() {
  const { currentStep, setCurrentStep } = useAppContext()
  const navigate = useNavigate()

  const steps = [
    { number: 1, label: 'URL Input', path: '/url-input' },
    { number: 2, label: 'Path URL', path: '/subdomain' },
    { number: 3, label: 'AI Studio', path: '/ai-studio' },
    { number: 4, label: 'Bonus Selection', path: '/bonus-selection' },
    { number: 5, label: 'Publish', path: '/publish' }
  ]

  const handleStepClick = (step) => {
    if (step.number < currentStep) {
      setCurrentStep(step.number)
      navigate(step.path)
    }
  }

  return (
    <div className="mb-8">
      <div className="step-indicator">
        {steps.map((step) => (
          <div 
            key={step.number}
            className={`step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
            onClick={() => handleStepClick(step)}
            style={{ cursor: step.number < currentStep ? 'pointer' : 'default' }}
          >
            {currentStep > step.number ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              step.number
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600 px-2">
        {steps.map((step) => (
          <div 
            key={step.number} 
            className={`w-1/5 text-center ${currentStep === step.number ? 'font-semibold text-primary' : ''}`}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  )
}
