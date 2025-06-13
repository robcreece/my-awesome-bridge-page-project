// This is a mock API service for demonstration purposes
// In a real application, this would connect to a backend service

// Base URL for the API
const API_BASE_URL = 'https://api.clickhumble.com'; // Replace with your actual API base URL

export const validateSubdomain = async (subdomain) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, we'll consider subdomains longer than 5 chars as available
      const isAvailable = subdomain.length > 5
      
      if (isAvailable) {
        resolve({ available: true })
      } else {
        resolve({ available: false, reason: 'This subdomain is already taken.' })
      }
    }, 1000)
  })
}

export const validatePath = async (path) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, we'll consider paths longer than 5 chars as available
      // In a real app, this would check against existing paths in the database
      const isAvailable = path.length > 5
      
      if (isAvailable) {
        resolve({ available: true })
      } else {
        resolve({ available: false, reason: 'This path is already taken.' })
      }
    }, 1000)
  })
}

export const scrapeSalesPage = async (url) => {
  // Simulate API call to scrape a sales page
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, we'll randomly succeed or fail
      const isSuccessful = Math.random() > 0.3
      
      if (isSuccessful) {
        resolve({
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
        })
      } else {
        reject(new Error('Failed to scrape sales page'))
      }
    }, 2000)
  })
}

export const generateAIContent = async (prompt, type) => {
  // Simulate API call to AI service
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (type === 'headlines') {
        resolve([
          'Stop Struggling With Affiliate Marketing - This System Changes Everything',
          'The Fastest Way To Generate Affiliate Commissions Without Technical Skills',
          'How This Revolutionary System Is Helping Ordinary People Make Extraordinary Commissions'
        ])
      } else if (type === 'benefits') {
        resolve([
          'Get started in under 10 minutes with our step-by-step setup wizard',
          'Increase your conversion rates by up to 300% with our proven templates',
          'No technical skills required - our system does all the heavy lifting',
          'Works with any affiliate network including WarriorPlus, JVZoo, and ClickBank',
          'Full 24/7 support and regular updates included at no extra cost'
        ])
      } else if (type === 'bonuses') {
        resolve([
          {
            title: 'Affiliate Marketing Quickstart Guide',
            description: 'A comprehensive PDF guide to help you get started with affiliate marketing in just 24 hours.',
            effort: 2
          },
          {
            title: '50 High-Converting Email Templates',
            description: 'Copy-paste email templates specifically designed for affiliate promotions.',
            effort: 1
          },
          {
            title: 'Traffic Generation Masterclass',
            description: 'A 5-part video series showing you how to drive targeted traffic to your affiliate offers.',
            effort: 4
          },
          {
            title: 'Affiliate Disclaimer Generator',
            description: 'Create legally compliant affiliate disclaimers with just a few clicks.',
            effort: 1
          },
          {
            title: 'Conversion Rate Optimization Checklist',
            description: '27-point checklist to maximize your affiliate page conversions.',
            effort: 2
          }
        ])
      } else {
        reject(new Error('Invalid content type'))
      }
    }, 2000)
  })
}

export const publishBridgePage = async (data) => {
  // For a real implementation, this would be an actual API call
  // For now, we'll create a more robust simulation that handles the page creation
  
  try {
    // In a real implementation, this would be a fetch or axios call to your backend
    // Example: const response = await fetch(`${API_BASE_URL}/pages`, { method: 'POST', body: JSON.stringify(data) })
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate HTML content for the page
    const htmlContent = generateHtmlForPage(data);
    
    // In a real implementation, the backend would save this HTML content
    // and make it available at the specified URL
    
    // For demo purposes, we'll simulate a successful response
    // In a real app, this would be the response from your backend API
    const publishedUrl = `https://clickhumble.com/${data.path}`;
    
    // Log what would be sent to the server (for debugging)
    console.log('Publishing bridge page with data:', data);
    console.log('Generated HTML content:', htmlContent.substring(0, 200) + '...');
    
    // Create a local storage entry to simulate the page being published
    // This allows us to "serve" the page content when the user visits the URL
    localStorage.setItem(`bridge_page_${data.path}`, htmlContent);
    
    // Return success response
    return {
      success: true,
      url: publishedUrl,
      message: 'Bridge page published successfully',
      // Include a preview URL that will actually work in the demo
      previewUrl: `/preview/${data.path}`
    };
  } catch (error) {
    console.error('Error publishing bridge page:', error);
    return {
      success: false,
      message: error.message || 'Failed to publish bridge page. Please try again.',
      errorCode: 'NOT_FOUND',
      errorId: 'cle1::qm7qt-1749578348995-e92dd2f5249d'
    };
  }
};

// Helper function to generate HTML for the published page
function generateHtmlForPage(data) {
  const { headline, benefits, bonuses, videoUrl, affiliateLink, colorScheme } = data;
  const selectedBonuses = bonuses || [];
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
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
      <h1>${headline}</h1>
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
  `;
}

export const exportToWordPress = async (data) => {
  // Simulate API call to export to WordPress
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Successfully exported to WordPress'
      })
    }, 2000)
  })
}
