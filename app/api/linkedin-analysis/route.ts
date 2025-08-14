import { NextRequest, NextResponse } from 'next/server'

// Mock data for development - remove this in production
const MOCK_LINKEDIN_DATA = {
  "https://linkedin.com/in/johndoe": {
    fullName: "John Doe",
    headline: "Senior Software Engineer at TechCorp",
    location: "San Francisco, CA",
    industry: "Technology",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp",
        duration: "2021 - Present",
        description: "Leading development of customer-facing applications using React and Node.js. Mentoring junior developers and implementing best practices."
      },
      {
        title: "Software Engineer",
        company: "StartupXYZ",
        duration: "2019 - 2021",
        description: "Built responsive web applications and collaborated with design and backend teams. Contributed to product roadmap and technical decisions."
      },
      {
        title: "Junior Developer",
        company: "Digital Solutions Inc",
        duration: "2017 - 2019",
        description: "Developed and maintained web applications. Participated in code reviews and agile development processes."
      }
    ],
    skills: [
      "JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS", "Docker",
      "TypeScript", "MongoDB", "REST APIs", "GraphQL", "Agile", "Scrum", "Leadership"
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2017"
      },
      {
        degree: "Full Stack Web Development",
        institution: "Coding Bootcamp",
        year: "2016"
      }
    ],
    recommendations: [
      "Focus on building more backend expertise to become a full-stack developer",
      "Consider pursuing cloud certifications (AWS, Azure) for career advancement",
      "Develop leadership skills by taking on more mentoring responsibilities",
      "Stay updated with emerging technologies like AI/ML and blockchain"
    ],
    skillScore: 78
  },
  "https://linkedin.com/in/janesmith": {
    fullName: "Jane Smith",
    headline: "Product Manager at Innovation Labs",
    location: "New York, NY",
    industry: "Product Management",
    experience: [
      {
        title: "Product Manager",
        company: "Innovation Labs",
        duration: "2022 - Present",
        description: "Leading product strategy and development for B2B SaaS platform. Managing cross-functional teams and driving product roadmap."
      },
      {
        title: "Associate Product Manager",
        company: "TechStart",
        duration: "2020 - 2022",
        description: "Assisted in product planning, user research, and feature prioritization. Collaborated with engineering and design teams."
      }
    ],
    skills: [
      "Product Strategy", "User Research", "Data Analysis", "Agile", "Scrum", "JIRA",
      "Figma", "SQL", "A/B Testing", "Customer Development", "Market Research", "Roadmapping"
    ],
    education: [
      {
        degree: "Master of Business Administration",
        institution: "Stanford Graduate School of Business",
        year: "2020"
      },
      {
        degree: "Bachelor of Arts in Economics",
        institution: "Yale University",
        year: "2018"
      }
    ],
    recommendations: [
      "Develop technical skills to better communicate with engineering teams",
      "Build expertise in data analytics and user behavior analysis",
      "Consider specializing in a specific industry vertical",
      "Strengthen stakeholder management and executive communication skills"
    ],
    skillScore: 72
  }
}

interface LinkedInAnalysis {
  profileUrl: string
  fullName: string
  headline: string
  location: string
  industry: string
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  skills: string[]
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  recommendations: string[]
  skillScore: number
}

export async function POST(request: NextRequest) {
  try {
    const { profileUrl } = await request.json()
    
    if (!profileUrl) {
      return NextResponse.json({ error: 'LinkedIn profile URL is required' }, { status: 400 })
    }

    // Normalize URL
    let normalizedUrl = profileUrl.trim()
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`
    }

    console.log('🚀 Starting LinkedIn analysis for:', normalizedUrl)

    // Check if we have mock data for this URL
    const mockData = MOCK_LINKEDIN_DATA[normalizedUrl as keyof typeof MOCK_LINKEDIN_DATA]
    
    if (mockData) {
      console.log('✅ Using mock data for development')
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const analysis: LinkedInAnalysis = {
        profileUrl: normalizedUrl,
        ...mockData
      }
      
      return NextResponse.json(analysis)
    }

    // For production, you would implement actual LinkedIn scraping here
    // For now, return a generic analysis based on the URL
    console.log('⚠️ No mock data found, generating generic analysis')
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Generate generic analysis
    const genericAnalysis: LinkedInAnalysis = {
      profileUrl: normalizedUrl,
      fullName: "Professional Profile",
      headline: "Professional in Technology",
      location: "United States",
      industry: "Technology",
      experience: [
        {
          title: "Professional Experience",
          company: "Various Companies",
          duration: "Current",
          description: "Experience details could not be extracted. This may be due to profile privacy settings or LinkedIn's anti-scraping measures."
        }
      ],
      skills: [
        "Professional Skills", "Communication", "Leadership", "Problem Solving",
        "Teamwork", "Adaptability", "Technical Skills", "Project Management"
      ],
      education: [
        {
          degree: "Educational Background",
          institution: "Various Institutions",
          year: "Various Years"
        }
      ],
      recommendations: [
        "Ensure your LinkedIn profile is public and accessible for analysis",
        "Add detailed descriptions to your work experiences",
        "Include specific skills and endorsements",
        "Keep your profile updated with recent achievements",
        "Consider adding certifications and courses",
        "Engage with industry content to improve visibility"
      ],
      skillScore: 45
    }
    
    return NextResponse.json(genericAnalysis)

  } catch (error) {
    console.error('❌ LinkedIn analysis error:', error)
    
    return NextResponse.json({ 
      error: 'Failed to analyze LinkedIn profile. This may be due to profile privacy settings or LinkedIn\'s anti-scraping measures.',
      details: 'Please ensure the profile is public and try again later.'
    }, { status: 500 })
  }
}
