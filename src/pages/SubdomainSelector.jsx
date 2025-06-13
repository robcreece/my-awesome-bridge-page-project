import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { HexColorPicker } from 'react-colorful'
import { validatePath } from '../utils/api'

const validationSchema = Yup.object({
  path: Yup.string()
    .matches(
      /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/,
      'Path can only contain letters, numbers, and hyphens, and cannot start or end with a hyphen'
    )
    .required('Path is required')
})

export default function SubdomainSelector() {
  const { 
    path, 
    setPath, 
    manualInput, 
    colorScheme, 
    setColorScheme,
    setCurrentStep
  } = useAppContext()
  
  const [isChecking, setIsChecking] = useState(false)
  const [activeColorPicker, setActiveColorPicker] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    setIsChecking(true)
    
    try {
      // Check path availability
      const result = await validatePath(values.path)
      
      if (result.available) {
        setPath(values.path)
        toast.success(`Path clickhumble.com/${values.path} is available!`)
        setCurrentStep(3)
        navigate('/ai-studio')
      } else {
        toast.error(`Path clickhumble.com/${values.path} is already taken. Please try another.`)
      }
    } catch (error) {
      toast.error('An error occurred while checking path availability.')
    } finally {
      setIsChecking(false)
    }
  }

  const handleColorChange = (color, type) => {
    setColorScheme({
      ...colorScheme,
      [type]: color
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="form-container">
        <h2 className="text-2xl font-bold mb-6">Choose Your Path URL</h2>
        
        <Formik
          initialValues={{ path: path || '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label htmlFor="path" className="block text-sm font-medium text-gray-700 mb-1">
                  Path URL
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    clickhumble.com/
                  </span>
                  <Field
                    type="text"
                    name="path"
                    id="path"
                    className="input-field rounded-l-none"
                    placeholder="your-path"
                  />
                </div>
                <ErrorMessage name="path" component="div" className="error-message" />
                <p className="text-sm text-gray-500 mt-1">
                  This will be the URL where your bridge page is hosted.
                </p>
              </div>
              
              {manualInput && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Color Scheme</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    We couldn't extract colors from the sales page. Please choose your color scheme manually.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(colorScheme).map(([key, value]) => (
                      key !== 'background' && key !== 'text' ? (
                        <div key={key} className="relative">
                          <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                            {key} Color
                          </label>
                          <div 
                            className="h-10 w-full rounded-md border border-gray-300 cursor-pointer flex items-center justify-between px-3"
                            style={{ backgroundColor: value }}
                            onClick={() => setActiveColorPicker(activeColorPicker === key ? null : key)}
                          >
                            <span className="text-xs font-mono" style={{ 
                              color: key === 'primary' || key === 'secondary' ? 'white' : 'black',
                              textShadow: '0 0 2px rgba(0,0,0,0.3)'
                            }}>
                              {value}
                            </span>
                          </div>
                          
                          {activeColorPicker === key && (
                            <div className="absolute z-10 mt-1">
                              <HexColorPicker 
                                color={value} 
                                onChange={(color) => handleColorChange(color, key)} 
                              />
                            </div>
                          )}
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCurrentStep(1)
                    navigate('/url-input')
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || isChecking}
                >
                  {isChecking ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking Availability...
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
              Your bridge page will be hosted at <strong>clickhumble.com/[path]</strong>. Choose a name that's easy to remember and relevant to your promotion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
