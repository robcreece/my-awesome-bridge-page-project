import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const validationSchema = Yup.object({
  salesPageUrl: Yup.string()
    .url('Please enter a valid URL')
    .matches(
      /(warriorplus\.com|jvzoo\.com)/i,
      'URL must be from WarriorPlus or JVZoo'
    )
    .required('Sales page URL is required')
})

export default function UrlInput() {
  const { 
    salesPageUrl, 
    setSalesPageUrl, 
    setScrapedData, 
    setManualInput,
    setCurrentStep,
    colorScheme,
    setColorScheme
  } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    setIsLoading(true)
    setSalesPageUrl(values.salesPageUrl)
    
    try {
      // Simulate scraping with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, we'll simulate a successful scrape 70% of the time
      const isSuccessful = Math.random() > 0.3
      
      if (isSuccessful) {
        // Simulate scraped data
        const mockScrapedData = {
          title: 'Ultimate Affiliate Marketing System',
          description: 'The most powerful affiliate marketing system ever created',
          keywords: ['affiliate marketing', 'passive income', 'online business'],
          colors: {
            primary: '#3b82f6',
            secondary: '#10b981',
            accent: '#f59e0b',
            background: '#ffffff',
            text: '#1f2937'
          }
        }
        
        setScrapedData(mockScrapedData)
        setColorScheme(mockScrapedData.colors)
        setManualInput(false)
        toast.success('Sales page scraped successfully!')
      } else {
        // Simulate scraping failure
        setScrapedData(null)
        setManualInput(true)
        toast.error('Could not scrape the sales page. Please enter details manually.')
      }
      
      setCurrentStep(2)
      navigate('/subdomain')
    } catch (error) {
      toast.error('An error occurred while scraping the sales page.')
      setManualInput(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="form-container">
        <h2 className="text-2xl font-bold mb-6">Enter Sales Page URL</h2>
        
        <Formik
          initialValues={{ salesPageUrl }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="salesPageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Page URL
                </label>
                <Field
                  type="url"
                  name="salesPageUrl"
                  id="salesPageUrl"
                  className="input-field"
                  placeholder="https://warriorplus.com/o2/a/example/example"
                />
                <ErrorMessage name="salesPageUrl" component="div" className="error-message" />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the URL of the WarriorPlus or JVZoo sales page you want to promote.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Page...
                    </span>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">
              We'll analyze the sales page to extract colors, keywords, and other elements to create a matching bridge page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
