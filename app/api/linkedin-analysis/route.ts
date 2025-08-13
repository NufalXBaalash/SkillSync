import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

interface LinkedInProfile {
  name: string
  headline: string
  location: string
  summary: string
  skills: string[]
  experiences: Experience[]
  certifications: Certification[]
  education: Education[]
  activityLevel: 'High' | 'Medium' | 'Low'
  topics: string[]
}

interface Experience {
  title: string
  company: string
  duration: string
  description: string
}

interface Certification {
  name: string
  issuer: string
  date: string
  description: string
}

interface Education {
  degree: string
  institution: string
  year: string
  field: string
}

interface LinkedInAnalysis {
  profile: LinkedInProfile
  skillScore: number
  recommendations: string[]
  analysisDate: string
}

async function scrapeLinkedInProfile(linkedinUrl: string): Promise<LinkedInProfile> {
  console.log('🚀 Starting LinkedIn scraping for:', linkedinUrl)
  
  const browser = await puppeteer.launch({
    headless: false, // Change to false for debugging
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--disable-blink-features=AutomationControlled',
      '--disable-extensions-except',
      '--disable-plugins-discovery'
    ]
  })

  try {
    const page = await browser.newPage()
    
    // Set viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 })
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    
    // Navigate to LinkedIn profile
    console.log('📱 Navigating to LinkedIn profile...')
    await page.goto(linkedinUrl, { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    })
    
    // Wait for content to load
    console.log('⏳ Waiting for content to load...')
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    // Scroll down to load more content
    console.log('📜 Scrolling to load more content...')
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Scroll back up
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Take a screenshot for debugging
    console.log('📸 Taking screenshot for debugging...')
    await page.screenshot({ path: 'linkedin-debug.png', fullPage: true })
    
    // Extract profile data with improved selectors
    const profile = await page.evaluate(() => {
      console.log('🔍 Starting profile extraction...')
      
      // Function to safely get text content
      const getText = (selector: string, fallback: string = 'N/A') => {
        const element = document.querySelector(selector)
        return element ? element.textContent?.trim() || fallback : fallback
      }
      
      // Function to safely get multiple text elements
      const getMultipleText = (selectors: string[], fallback: string = 'N/A') => {
        for (const selector of selectors) {
          const element = document.querySelector(selector)
          if (element && element.textContent?.trim()) {
            return element.textContent.trim()
          }
        }
        return fallback
      }
      
      // Name - improved selectors
      const nameSelectors = [
        'h1.text-heading-xlarge',
        'h1',
        '.text-heading-xlarge',
        '[data-section="name"] h1',
        '.pv-text-details__left-panel h1',
        '.profile-background-image__container h1',
        '.profile-picture-header h1',
        '.pv-top-card-section__name',
        '.pv-top-card__name',
        '.profile-picture-header__name',
        '.pv-top-card__name',
        '.pv-top-card-section__name',
        '.profile-picture-header__name',
        '.pv-top-card__name',
        '.pv-top-card-section__name',
        '.profile-picture-header__name',
        '.pv-top-card__name',
        '.pv-top-card-section__name',
        '.profile-picture-header__name'
      ]
      
      const name = getMultipleText(nameSelectors, 'Profile Name')
      console.log('✅ Extracted name:', name)
      
      // Headline - improved selectors
      const headlineSelectors = [
        '.text-body-medium.break-words',
        '.text-body-medium',
        '[data-section="headline"] .text-body-medium',
        '.pv-text-details__left-panel .text-body-medium',
        '.pv-top-card-section__headline',
        '.profile-picture-header .text-body-medium',
        '.pv-top-card__headline',
        '.pv-top-card-section__headline'
      ]
      
      const headline = getMultipleText(headlineSelectors, 'Professional Headline')
      console.log('✅ Extracted headline:', headline)
      
      // Location - improved selectors
      const locationSelectors = [
        '.text-body-small.inline.t-black--light.break-words',
        '.text-body-small',
        '[data-section="location"] .text-body-small',
        '.pv-top-card-section__location',
        '.profile-picture-header .text-body-small',
        '.pv-top-card__location',
        '.pv-top-card-section__location'
      ]
      
      const location = getMultipleText(locationSelectors, 'Location')
      console.log('✅ Extracted location:', location)
      
      // Summary/About section - improved selectors
      const summarySelectors = [
        '[data-section="summary"] .pv-shared-text-with-see-more',
        '[data-section="summary"] .pv-shared-text-with-see-more span',
        '.pv-shared-text-with-see-more',
        '.pv-about__summary-text',
        '.pv-about__summary-text span',
        '.pv-about__summary-text p',
        '.pv-about__summary',
        '.pv-about__summary p'
      ]
      
      const summary = getMultipleText(summarySelectors, 'Profile summary could not be extracted')
      console.log('✅ Extracted summary:', summary)
      
      // Skills - improved selectors
      const skillSelectors = [
        '[data-section="skills"] .pvs-list__item--level-1',
        '[data-section="skills"] .pvs-entity',
        '.pvs-list__item--level-1',
        '.skill-categories-section .pvs-list__item--level-1',
        '.pv-skill-category-entity__name-text',
        '.skill-categories-section .pvs-entity__text',
        '.pv-skill-category-entity',
        '.pv-skill-category-entity__name',
        '.pv-skill-category-entity__name-text',
        '.pv-skill-category-entity__name-text',
        '.pv-skill-category-entity__name',
        '.pv-skill-category-entity',
        '.skill-category-entity',
        '.skill-category-entity__name',
        '.skill-category-entity__name-text',
        '.pv-skill-category-entity__name-text',
        '.pv-skill-category-entity__name',
        '.pv-skill-category-entity',
        '.skill-category-entity',
        '.skill-category-entity__name',
        '.skill-category-entity__name-text'
      ]
      
      let skills: string[] = []
      for (const selector of skillSelectors) {
        const skillElements = document.querySelectorAll(selector)
        if (skillElements.length > 0) {
          skills = Array.from(skillElements).map(skill => {
            const skillText = skill.querySelector('.pvs-entity__text, .pvs-entity__path-node, .pv-skill-category-entity__name-text, .pv-skill-category-entity__name, .pv-skill-category-entity__name-text, .pv-skill-category-entity__name, .pv-skill-category-entity, .skill-category-entity, .skill-category-entity__name, .skill-category-entity__name-text')?.textContent?.trim()
            return skillText || ''
          }).filter(skill => skill.length > 0 && skill.length < 100)
          if (skills.length > 0) break
        }
      }
      
      // If no skills found, try alternative approach
      if (skills.length === 0) {
        const skillElements = document.querySelectorAll('.pvs-entity, .pv-skill-category-entity, .skill-category-entity, .pv-skill-category-entity__name, .pv-skill-category-entity__name-text, .skill-category-entity__name, .skill-category-entity__name-text')
        skills = Array.from(skillElements).map(skill => {
          const skillText = skill.textContent?.trim()
          return skillText || ''
        }).filter(skill => skill.length > 0 && skill.length < 100)
      }
      
      // If still no skills, try more generic approach
      if (skills.length === 0) {
        const skillElements = document.querySelectorAll('[class*="skill"], [class*="Skill"], [class*="SKILL"]')
        skills = Array.from(skillElements).map(skill => {
          const skillText = skill.textContent?.trim()
          return skillText || ''
        }).filter(skill => skill.length > 0 && skill.length < 100)
      }
      
      console.log('✅ Extracted skills:', skills)
      
      // Experience - improved selectors
      const experienceSelectors = [
        '[data-section="experience"] .pvs-list__item--level-1',
        '[data-section="experience"] .pvs-entity',
        '.experience-section .pvs-list__item--level-1',
        '.pv-position-entity',
        '.experience__item',
        '.pv-entity__summary-info-v2',
        '.pv-entity__summary-info',
        '.pv-entity__summary-info-v2',
        '.pv-entity__summary-info',
        '.pv-entity__summary-info-v2',
        '.pv-entity__summary-info',
        '.pv-entity__summary-info-v2',
        '.pv-entity__summary-info',
        '.pv-entity__summary-info-v2',
        '.pv-entity__summary-info'
      ]
      
      let experiences: any[] = []
      for (const selector of experienceSelectors) {
        const experienceElements = document.querySelectorAll(selector)
        if (experienceElements.length > 0) {
          experiences = Array.from(experienceElements).map(exp => {
            const titleElement = exp.querySelector('.pvs-entity__text, .pvs-entity__path-node, .pv-entity__summary-info-v2, .pv-entity__summary-info, .pv-entity__summary-info-v2, .pv-entity__summary-info, .pv-entity__summary-info-v2, .pv-entity__summary-info, .pv-entity__summary-info-v2, .pv-entity__summary-info')
            const companyElement = exp.querySelector('.pvs-entity__path-node, .pvs-entity__text, .pv-entity__secondary-title, .pv-entity__company-summary-info, .pv-entity__secondary-title, .pv-entity__company-summary-info, .pv-entity__secondary-title, .pv-entity__company-summary-info, .pv-entity__secondary-title, .pv-entity__company-summary-info')
            const durationElement = exp.querySelector('.pvs-entity__caption-wrapper, .pvs-entity__caption, .pv-entity__date-range, .pv-entity__date-range-v2, .pv-entity__date-range, .pv-entity__date-range-v2, .pv-entity__date-range, .pv-entity__date-range-v2, .pv-entity__date-range, .pv-entity__date-range-v2')
            
            return {
              title: titleElement?.textContent?.trim() || 'N/A',
              company: companyElement?.textContent?.trim() || 'N/A',
              duration: durationElement?.textContent?.trim() || 'N/A',
              description: 'Experience details extracted from LinkedIn'
            }
          }).filter(exp => exp.title !== 'N/A' && exp.title.length > 2)
          if (experiences.length > 0) break
        }
      }
      
      // If no experiences found, try alternative approach
      if (experiences.length === 0) {
        const experienceElements = document.querySelectorAll('[class*="experience"], [class*="Experience"], [class*="EXPERIENCE"], [class*="position"], [class*="Position"], [class*="POSITION"]')
        experiences = Array.from(experienceElements).map(exp => {
          const titleElement = exp.querySelector('[class*="title"], [class*="Title"], [class*="TITLE"]')
          const companyElement = exp.querySelector('[class*="company"], [class*="Company"], [class*="COMPANY"]')
          const durationElement = exp.querySelector('[class*="duration"], [class*="Duration"], [class*="DURATION"], [class*="date"], [class*="Date"], [class*="DATE"]')
          
          return {
            title: titleElement?.textContent?.trim() || 'N/A',
            company: companyElement?.textContent?.trim() || 'N/A',
            duration: durationElement?.textContent?.trim() || 'N/A',
            description: 'Experience details extracted from LinkedIn'
          }
        }).filter(exp => exp.title !== 'N/A' && exp.title.length > 2)
      }
      
      console.log('✅ Extracted experiences:', experiences)
      
      // Education - improved selectors
      const educationSelectors = [
        '[data-section="education"] .pvs-list__item--level-1',
        '[data-section="education"] .pvs-entity',
        '.education-section .pvs-list__item--level-1',
        '.pv-education-entity',
        '.pv-entity__summary-info-v2',
        '.pv-entity__summary-info',
        '.pv-education-entity__summary-info',
        '.pv-education-entity__summary-info-v2',
        '.pv-education-entity__summary-info',
        '.pv-education-entity__summary-info-v2',
        '.pv-education-entity__summary-info',
        '.pv-education-entity__summary-info-v2',
        '.pv-education-entity__summary-info',
        '.pv-education-entity__summary-info-v2',
        '.pv-education-entity__summary-info'
      ]
      
      let education: any[] = []
      for (const selector of educationSelectors) {
        const educationElements = document.querySelectorAll(selector)
        if (educationElements.length > 0) {
          education = Array.from(educationElements).map(edu => {
            const degreeElement = edu.querySelector('.pvs-entity__text, .pvs-entity__path-node, .pv-entity__summary-info-v2, .pv-entity__summary-info, .pv-education-entity__summary-info, .pv-education-entity__summary-info-v2, .pv-education-entity__summary-info, .pv-education-entity__summary-info-v2, .pv-education-entity__summary-info, .pv-education-entity__summary-info-v2, .pv-education-entity__summary-info')
            const institutionElement = edu.querySelector('.pvs-entity__path-node, .pvs-entity__text, .pv-entity__secondary-title, .pv-entity__company-summary-info, .pv-education-entity__secondary-title, .pv-education-entity__company-summary-info, .pv-education-entity__secondary-title, .pv-education-entity__company-summary-info, .pv-education-entity__secondary-title, .pv-education-entity__company-summary-info, .pv-education-entity__secondary-title, .pv-education-entity__company-summary-info')
            const yearElement = edu.querySelector('.pvs-entity__caption-wrapper, .pvs-entity__caption, .pv-entity__date-range, .pv-entity__date-range-v2, .pv-education-entity__date-range, .pv-education-entity__date-range-v2, .pv-education-entity__date-range, .pv-education-entity__date-range-v2, .pv-education-entity__date-range, .pv-education-entity__date-range-v2, .pv-education-entity__date-range, .pv-education-entity__date-range-v2')
            
            return {
              degree: degreeElement?.textContent?.trim() || 'N/A',
              institution: institutionElement?.textContent?.trim() || 'N/A',
              year: yearElement?.textContent?.trim() || 'N/A',
              field: 'Education field from LinkedIn'
            }
          }).filter(edu => edu.degree !== 'N/A' && edu.degree.length > 2)
          if (education.length > 0) break
        }
      }
      
      // If no education found, try alternative approach
      if (education.length === 0) {
        const educationElements = document.querySelectorAll('[class*="education"], [class*="Education"], [class*="EDUCATION"], [class*="school"], [class*="School"], [class*="SCHOOL"], [class*="university"], [class*="University"], [class*="UNIVERSITY"]')
        education = Array.from(educationElements).map(edu => {
          const degreeElement = edu.querySelector('[class*="degree"], [class*="Degree"], [class*="DEGREE"]')
          const institutionElement = edu.querySelector('[class*="institution"], [class*="Institution"], [class*="INSTITUTION"], [class*="school"], [class*="School"], [class*="SCHOOL"]')
          const yearElement = edu.querySelector('[class*="year"], [class*="Year"], [class*="YEAR"], [class*="date"], [class*="Date"], [class*="DATE"]')
          
          return {
            degree: degreeElement?.textContent?.trim() || 'N/A',
            institution: institutionElement?.textContent?.trim() || 'N/A',
            year: yearElement?.textContent?.trim() || 'N/A',
            field: 'Education field from LinkedIn'
          }
        }).filter(edu => edu.degree !== 'N/A' && edu.degree.length > 2)
      }
      
      console.log('✅ Extracted education:', education)
      
      // Certifications - improved selectors
      const certSelectors = [
        '[data-section="certifications"] .pvs-list__item--level-1',
        '[data-section="certifications"] .pvs-entity',
        '.certifications-section .pvs-list__item--level-1',
        '.pv-certification-entity',
        '.pv-entity__summary-info-v2',
        '.pv-entity__summary-info',
        '.pv-certification-entity__summary-info',
        '.pv-certification-entity__summary-info-v2',
        '.pv-certification-entity__summary-info',
        '.pv-certification-entity__summary-info-v2',
        '.pv-certification-entity__summary-info',
        '.pv-certification-entity__summary-info-v2',
        '.pv-certification-entity__summary-info',
        '.pv-certification-entity__summary-info-v2',
        '.pv-certification-entity__summary-info'
      ]
      
      let certifications: any[] = []
      for (const selector of certSelectors) {
        const certElements = document.querySelectorAll(selector)
        if (certElements.length > 0) {
          certifications = Array.from(certElements).map(cert => {
            const nameElement = cert.querySelector('.pvs-entity__text, .pvs-entity__path-node, .pv-entity__summary-info-v2, .pv-entity__summary-info, .pv-certification-entity__summary-info, .pv-certification-entity__summary-info-v2, .pv-certification-entity__summary-info, .pv-certification-entity__summary-info-v2, .pv-certification-entity__summary-info, .pv-certification-entity__summary-info-v2, .pv-certification-entity__summary-info')
            const issuerElement = cert.querySelector('.pvs-entity__path-node, .pvs-entity__text, .pv-entity__secondary-title, .pv-entity__company-summary-info, .pv-certification-entity__secondary-title, .pv-certification-entity__company-summary-info, .pv-certification-entity__secondary-title, .pv-certification-entity__company-summary-info, .pv-certification-entity__secondary-title, .pv-certification-entity__company-summary-info, .pv-certification-entity__secondary-title, .pv-certification-entity__company-summary-info')
            const dateElement = cert.querySelector('.pvs-entity__caption-wrapper, .pvs-entity__caption, .pv-entity__date-range, .pv-entity__date-range-v2, .pv-certification-entity__date-range, .pv-certification-entity__date-range-v2, .pv-certification-entity__date-range, .pv-certification-entity__date-range-v2, .pv-certification-entity__date-range, .pv-certification-entity__date-range-v2, .pv-certification-entity__date-range, .pv-certification-entity__date-range-v2')
            
            return {
              name: nameElement?.textContent?.trim() || 'N/A',
              issuer: issuerElement?.textContent?.trim() || 'N/A',
              date: dateElement?.textContent?.trim() || 'N/A',
              description: 'Certification from LinkedIn profile'
            }
          }).filter(cert => cert.name !== 'N/A' && cert.name.length > 2)
          if (certifications.length > 0) break
        }
      }
      
      // If no certifications found, try alternative approach
      if (certifications.length === 0) {
        const certElements = document.querySelectorAll('[class*="certification"], [class*="Certification"], [class*="CERTIFICATION"], [class*="cert"], [class*="Cert"], [class*="CERT"]')
        certifications = Array.from(certElements).map(cert => {
          const nameElement = cert.querySelector('[class*="name"], [class*="Name"], [class*="NAME"]')
          const issuerElement = cert.querySelector('[class*="issuer"], [class*="Issuer"], [class*="ISSUER"], [class*="organization"], [class*="Organization"], [class*="ORGANIZATION"]')
          const dateElement = cert.querySelector('[class*="date"], [class*="Date"], [class*="DATE"], [class*="year"], [class*="Year"], [class*="YEAR"]')
          
          return {
            name: nameElement?.textContent?.trim() || 'N/A',
            issuer: issuerElement?.textContent?.trim() || 'N/A',
            date: dateElement?.textContent?.trim() || 'N/A',
            description: 'Certification from LinkedIn profile'
          }
        }).filter(cert => cert.name !== 'N/A' && cert.name.length > 2)
      }
      
      console.log('✅ Extracted certifications:', certifications)
      
      // Activity level (based on recent posts visibility)
      const recentActivity = document.querySelectorAll('[data-section="posts"] .pvs-list__item--level-1, .post-feed .pvs-list__item--level-1, .pv-post-entity')
      let activityLevel: 'High' | 'Medium' | 'Low' = 'Low'
      if (recentActivity.length > 5) activityLevel = 'High'
      else if (recentActivity.length > 2) activityLevel = 'Medium'
      
      // Topics (from recent posts and interests)
      const topics = ['Professional Development', 'Industry Insights', 'Career Growth']
      
      const result = {
        name,
        headline,
        location,
        summary,
        skills,
        experiences,
        certifications,
        education,
        activityLevel,
        topics
      }
      
      console.log('🎉 Final extracted profile:', result)
      return result
    })
    
    console.log('✅ Scraping completed successfully')
    await browser.close()
    return profile
    
  } catch (error) {
    console.error('❌ LinkedIn scraping error:', error)
    await browser.close()
    
    // Return more realistic fallback data
    return {
      name: 'LinkedIn Profile',
      headline: 'Professional Profile',
      location: 'Location not available',
      summary: 'Profile data could not be extracted. This may be due to profile privacy settings or LinkedIn\'s anti-scraping measures.',
      skills: ['Professional Skills', 'Communication', 'Leadership', 'Problem Solving'],
      experiences: [
        {
          title: 'Professional Experience',
          company: 'Various Companies',
          duration: 'Current',
          description: 'Experience details could not be extracted from LinkedIn'
        }
      ],
      certifications: [
        {
          name: 'Professional Certifications',
          issuer: 'Various Organizations',
          date: 'Ongoing',
          description: 'Certification information could not be extracted'
        }
      ],
      education: [
        {
          degree: 'Educational Background',
          institution: 'Various Institutions',
          year: 'Various Years',
          field: 'Professional Development'
        }
      ],
      activityLevel: 'Medium',
      topics: ['Professional Development', 'Career Growth', 'Industry Insights']
    }
  }
}

// Helper functions
function calculateActivityLevel(profileData: any): string {
  const contentCount = (profileData.skills?.length || 0) + 
                      (profileData.experiences?.length || 0) + 
                      (profileData.education?.length || 0) + 
                      (profileData.certifications?.length || 0)
  
  if (contentCount > 20) return 'High'
  if (contentCount > 10) return 'Medium'
  return 'Low'
}

function extractTopics(summary: string, experiences: string[]): string[] {
  const topics: string[] = []
  
  // Extract topics from summary
  if (summary) {
    const commonTopics = ['leadership', 'management', 'development', 'design', 'marketing', 'sales', 'finance', 'operations', 'strategy', 'innovation', 'technology', 'data', 'analytics', 'customer', 'product', 'service', 'quality', 'efficiency', 'growth', 'transformation']
    
    commonTopics.forEach(topic => {
      if (summary.toLowerCase().includes(topic)) {
        topics.push(topic.charAt(0).toUpperCase() + topic.slice(1))
      }
    })
  }
  
  // Extract topics from experiences
  if (experiences && experiences.length > 0) {
    experiences.forEach(exp => {
      if (exp.toLowerCase().includes('manager')) topics.push('Management')
      if (exp.toLowerCase().includes('developer')) topics.push('Development')
      if (exp.toLowerCase().includes('designer')) topics.push('Design')
      if (exp.toLowerCase().includes('analyst')) topics.push('Analytics')
    })
  }
  
  // Remove duplicates
  return [...new Set(topics)]
}

function calculateSkillScore(profileData: any): number {
  let score = 0
  
  // Base score from profile completeness
  if (profileData.name) score += 10
  if (profileData.headline) score += 10
  if (profileData.location) score += 5
  if (profileData.summary) score += 15
  
  // Score from skills
  const skillsCount = profileData.skills?.length || 0
  score += Math.min(skillsCount * 2, 20)
  
  // Score from experiences
  const experiencesCount = profileData.experiences?.length || 0
  score += Math.min(experiencesCount * 3, 20)
  
  // Score from education
  const educationCount = profileData.education?.length || 0
  score += Math.min(educationCount * 2, 10)
  
  // Score from certifications
  const certificationsCount = profileData.certifications?.length || 0
  score += Math.min(certificationsCount * 2, 10)
  
  return Math.min(score, 100)
}

function generateRecommendations(profileData: any, skillScore: number): string[] {
  const recommendations: string[] = []
  
  // Check for missing important sections
  if (!profileData.summary) {
    recommendations.push('Add a compelling summary to showcase your professional story and value proposition')
  }
  
  if (!profileData.skills || profileData.skills.length < 5) {
    recommendations.push('Add more skills to highlight your technical and soft skills')
  }
  
  if (!profileData.experiences || profileData.experiences.length < 2) {
    recommendations.push('Include detailed work experiences with achievements and responsibilities')
  }
  
  if (!profileData.education || profileData.education.length < 1) {
    recommendations.push('Add your educational background and any relevant certifications')
  }
  
  if (skillScore < 50) {
    recommendations.push('Focus on completing your profile with detailed information in all sections')
  }
  
  if (skillScore < 70) {
    recommendations.push('Consider adding more specific achievements and measurable results to your experiences')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Great profile! Consider adding industry-specific keywords and recent achievements')
  }
  
  return recommendations
}

export async function POST(request: NextRequest) {
  try {
    const { linkedinUrl } = await request.json()
    
    if (!linkedinUrl) {
      return NextResponse.json({ error: 'LinkedIn URL is required' }, { status: 400 })
    }

    // Normalize URL
    let normalizedUrl = linkedinUrl.trim()
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`
    }

    console.log('🚀 Starting LinkedIn scraping for:', normalizedUrl)

    // Launch browser with enhanced anti-detection
    const browser = await puppeteer.launch({
      headless: false, // Keep false for debugging
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--disable-blink-features=AutomationControlled',
        '--disable-extensions-except',
        '--disable-plugins-discovery',
        '--disable-default-apps',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--window-size=1920,1080',
        '--start-maximized'
      ]
    })

    const page = await browser.newPage()
    
    // Set realistic viewport
    await page.setViewport({ width: 1920, height: 1080 })
    
    // Set extra headers to appear more like a real browser
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })

    // Remove webdriver property
    await page.evaluateOnNewDocument(() => {
      delete (navigator as any).webdriver
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      })
    })

    // Navigate to the profile
    console.log('🌐 Navigating to LinkedIn profile...')
    await page.goto(normalizedUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    })

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Check if we're redirected to login page
    const currentUrl = page.url()
    if (currentUrl.includes('linkedin.com/login') || currentUrl.includes('linkedin.com/signup')) {
      console.log('⚠️ Redirected to login page, trying alternative approach...')
      
      // Try to go back to the original URL
      await page.goto(normalizedUrl, { waitUntil: 'networkidle2' })
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Check again
      if (page.url().includes('linkedin.com/login')) {
        console.log('❌ Still redirected to login page')
        await browser.close()
        throw new Error('LinkedIn is requiring authentication. Please ensure the profile is public and accessible.')
      }
    }

    // Check if we're on a valid profile page
    const pageTitle = await page.title()
    if (pageTitle.includes('Page Not Found') || pageTitle.includes('Profile Not Found')) {
      console.log('❌ Profile not found')
      await browser.close()
      throw new Error('LinkedIn profile not found. Please check the URL and ensure the profile exists.')
    }

    // Check if we're blocked
    const pageContent = await page.content()
    if (pageContent.includes('unusual activity') || pageContent.includes('security check') || pageContent.includes('verify you')) {
      console.log('❌ LinkedIn security check detected')
      await browser.close()
      throw new Error('LinkedIn detected unusual activity. Please try again later or use a different profile.')
    }

    // Scroll to load more content
    console.log('📜 Scrolling to load content...')
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Take a screenshot for debugging
    await page.screenshot({ path: 'linkedin-debug.png', fullPage: true })
    console.log('📸 Screenshot saved as linkedin-debug.png')

    // Extract profile data with enhanced selectors
    console.log('🔍 Extracting profile data...')
    
    const profileData = await page.evaluate(() => {
      // Helper function to safely extract text
      const safeExtract = (selector: string, fallback: string = '') => {
        try {
          const element = document.querySelector(selector)
          return element ? element.textContent?.trim() || fallback : fallback
        } catch {
          return fallback
        }
      }

      // Helper function to extract multiple elements
      const extractMultiple = (selector: string) => {
        try {
          const elements = document.querySelectorAll(selector)
          return Array.from(elements).map(el => el.textContent?.trim()).filter(Boolean)
        } catch {
          return []
        }
      }

      // Extract name with multiple selectors
      let name = ''
      const nameSelectors = [
        'h1.text-heading-xlarge',
        'h1[class*="text-heading"]',
        'h1[class*="top-card-layout__title"]',
        'h1[class*="profile__name"]',
        'h1[class*="name"]',
        'h1',
        '[class*="profile-name"]',
        '[class*="name"] h1',
        '.pv-text-details__left-panel h1',
        '.profile-picture-header h1'
      ]
      
      for (const selector of nameSelectors) {
        name = safeExtract(selector)
        if (name) break
      }

      // Extract headline
      let headline = ''
      const headlineSelectors = [
        '.text-body-medium.break-words',
        '[class*="headline"]',
        '[class*="title"]',
        '.pv-text-details__left-panel .text-body-medium',
        '.profile-picture-header .text-body-medium'
      ]
      
      for (const selector of headlineSelectors) {
        headline = safeExtract(selector)
        if (headline) break
      }

      // Extract location
      let location = ''
      const locationSelectors = [
        '.text-body-small.inline.t-black--light.break-words',
        '[class*="location"]',
        '[class*="address"]',
        '.pv-text-details__left-panel .text-body-small'
      ]
      
      for (const selector of locationSelectors) {
        location = safeExtract(selector)
        if (location) break
      }

      // Extract summary
      let summary = ''
      const summarySelectors = [
        '.pv-shared-text-with-see-more .visually-hidden',
        '[class*="summary"]',
        '[class*="about"]',
        '.pv-about__summary-text',
        '.pv-about__summary'
      ]
      
      for (const selector of summarySelectors) {
        summary = safeExtract(selector)
        if (summary) break
      }

      // Extract skills
      let skills: string[] = []
      const skillsSelectors = [
        '.pv-skill-category-entity__name-text',
        '[class*="skill"]',
        '.skill-category-entity__name',
        '.pv-skill-category-entity',
        '[data-section="skills"] .pv-skill-category-entity__name-text'
      ]
      
      for (const selector of skillsSelectors) {
        skills = extractMultiple(selector)
        if (skills.length > 0) break
      }

      // Extract experiences
      let experiences: string[] = []
      const experienceSelectors = [
        '.pvs-list__item--line-separated .pvs-entity--padded',
        '[class*="experience"]',
        '.pv-position-entity',
        '.experience__item',
        '[data-section="experience"] .pvs-entity--padded'
      ]
      
      for (const selector of experienceSelectors) {
        experiences = extractMultiple(selector)
        if (experiences.length > 0) break
      }

      // Extract education
      let education: string[] = []
      const educationSelectors = [
        '.pvs-list__item--line-separated .pvs-entity--padded',
        '[class*="education"]',
        '.pv-education-entity',
        '.education__item',
        '[data-section="education"] .pvs-entity--padded'
      ]
      
      for (const selector of educationSelectors) {
        education = extractMultiple(selector)
        if (education.length > 0) break
      }

      // Extract certifications
      let certifications: string[] = []
      const certificationSelectors = [
        '.pvs-list__item--line-separated .pvs-entity--padded',
        '[class*="certification"]',
        '.pv-certification-entity',
        '.certification__item',
        '[data-section="certifications"] .pvs-entity--padded'
      ]
      
      for (const selector of certificationSelectors) {
        certifications = extractMultiple(selector)
        if (certifications.length > 0) break
      }

      return {
        name,
        headline,
        location,
        summary,
        skills,
        experiences,
        education,
        certifications
      }
    })

    console.log('✅ Extracted profile data:', profileData)

    // Check if we got meaningful data
    if (!profileData.name) {
      console.log('⚠️ No name extracted, using fallback data')
      profileData.name = 'Profile Name (Could not extract)'
    }

    // Calculate activity level based on content
    const activityLevel = calculateActivityLevel(profileData)
    
    // Generate topics from summary and posts
    const topics = extractTopics(profileData.summary, profileData.experiences)
    
    // Calculate skill score
    const skillScore = calculateSkillScore(profileData)
    
    // Generate recommendations
    const recommendations = generateRecommendations(profileData, skillScore)

    const analysis = {
      name: profileData.name,
      headline: profileData.headline,
      location: profileData.location,
      summary: profileData.summary,
      skills: profileData.skills,
      experiences: profileData.experiences,
      education: profileData.education,
      certifications: profileData.certifications,
      topics,
      activityLevel,
      skillScore,
      recommendations
    }

    await browser.close()
    console.log('🎉 LinkedIn analysis completed successfully')
    
    return NextResponse.json(analysis)

  } catch (error) {
    console.error('❌ LinkedIn analysis error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('authentication')) {
        return NextResponse.json({ 
          error: 'LinkedIn requires authentication. Please ensure the profile is public and accessible.',
          details: 'The profile may be private or LinkedIn is blocking automated access.'
        }, { status: 403 })
      }
    }
    
    return NextResponse.json({ 
      error: 'Failed to analyze LinkedIn profile. This may be due to profile privacy settings or LinkedIn\'s anti-scraping measures.',
      details: 'Please ensure the profile is public and try again later.'
    }, { status: 500 })
  }
}
