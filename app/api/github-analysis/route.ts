import { NextRequest, NextResponse } from 'next/server'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  size: number
  created_at: string
  updated_at: string
  topics: string[]
  html_url: string
}

interface FileAnalysis {
  filename: string
  extension: string
  language: string
  size: number
  content?: string
}

interface SkillAnalysis {
  username: string
  totalRepos: number
  totalStars: number
  totalForks: number
  skillScore: number
  skills: {
    languages: { [key: string]: number }
    frameworks: { [key: string]: number }
    databases: { [key: string]: number }
    tools: { [key: string]: number }
  }
  topRepos: Array<{
    name: string
    description: string
    stars: number
    forks: number
    language: string
    url: string
  }>
  recommendations: string[]
}

// GitHub Public API endpoints (no authentication required)
const GITHUB_API_BASE = 'https://api.github.com'

// Technology detection patterns
const TECHNOLOGY_PATTERNS = {
  frameworks: {
    'React': /react|\.jsx?$/i,
    'Next.js': /next\.js|next\.config/i,
    'Vue.js': /vue|\.vue$/i,
    'Angular': /angular|\.ts$/i,
    'Express.js': /express/i,
    'Django': /django/i,
    'Flask': /flask/i,
    'Spring': /spring/i,
    'Laravel': /laravel/i,
    'Ruby on Rails': /rails/i,
    'ASP.NET': /asp\.net|\.csproj/i,
    'FastAPI': /fastapi/i,
    'NestJS': /nestjs/i,
    'Svelte': /svelte/i,
    'Nuxt.js': /nuxt/i,
    'Gatsby': /gatsby/i,
    'Remix': /remix/i,
    'Solid.js': /solid/i,
    'Qwik': /qwik/i,
    'Astro': /astro/i
  },
  databases: {
    'PostgreSQL': /postgres|postgresql/i,
    'MySQL': /mysql/i,
    'MongoDB': /mongodb/i,
    'Redis': /redis/i,
    'SQLite': /sqlite/i,
    'Oracle': /oracle/i,
    'SQL Server': /sqlserver|mssql/i,
    'Cassandra': /cassandra/i,
    'DynamoDB': /dynamodb/i,
    'Firebase': /firebase/i,
    'Supabase': /supabase/i,
    'PlanetScale': /planetscale/i,
    'Neon': /neon/i,
    'CockroachDB': /cockroach/i
  },
  tools: {
    'Docker': /docker|Dockerfile/i,
    'Kubernetes': /kubernetes|k8s|\.yaml?$/i,
    'GitHub Actions': /\.github\/workflows|\.yml$/i,
    'GitLab CI': /\.gitlab-ci\.yml/i,
    'Jenkins': /jenkins/i,
    'Terraform': /terraform|\.tf$/i,
    'Ansible': /ansible|\.yml$/i,
    'Puppet': /puppet/i,
    'Chef': /chef/i,
    'Vagrant': /vagrant|Vagrantfile/i,
    'Packer': /packer/i,
    'Consul': /consul/i,
    'Vault': /vault/i,
    'Nomad': /nomad/i
  },
  cloud: {
    'AWS': /aws|amazon|\.tf$/i,
    'Azure': /azure|microsoft/i,
    'Google Cloud': /gcp|google|\.tf$/i,
    'DigitalOcean': /digitalocean|do/i,
    'Heroku': /heroku/i,
    'Vercel': /vercel/i,
    'Netlify': /netlify/i,
    'Cloudflare': /cloudflare/i,
    'Linode': /linode/i,
    'Vultr': /vultr/i
  }
}

async function fetchGitHubData(username: string): Promise<GitHubRepo[]> {
  try {
    console.log(`📡 Fetching GitHub data for user: ${username}`)
    
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SkillSync-App'
      }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('GitHub username not found')
      }
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }
    
    const repos: GitHubRepo[] = await response.json()
    const filteredRepos = repos.filter(repo => !repo.fork) // Only include original repos
    
    console.log(`📊 Found ${repos.length} total repos, ${filteredRepos.length} original repos`)
    return filteredRepos
    
  } catch (error) {
    console.error('❌ Error fetching GitHub data:', error)
    throw error
  }
}

async function analyzeRepoContent(username: string, repoName: string): Promise<FileAnalysis[]> {
  try {
    console.log(`🔍 Analyzing repo content: ${username}/${repoName}`)
    
    const response = await fetch(`${GITHUB_API_BASE}/repos/${username}/${repoName}/contents`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SkillSync-App'
      }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️ Repo ${repoName} not found or empty`)
        return []
      }
      if (response.status === 403) {
        console.warn(`⚠️ Rate limited for repo ${repoName}`)
        return []
      }
      console.warn(`⚠️ Failed to fetch repo ${repoName}: ${response.status}`)
      return []
    }
    
    const contents = await response.json()
    const files: FileAnalysis[] = []
    
    // Handle single file vs directory
    if (Array.isArray(contents)) {
      for (const item of contents) {
        if (item.type === 'file') {
          const extension = item.name.split('.').pop()?.toLowerCase() || ''
          const language = getLanguageFromExtension(extension)
          
          files.push({
            filename: item.name,
            extension,
            language,
            size: item.size
          })
        }
      }
    } else if (contents.type === 'file') {
      // Single file
      const extension = contents.name.split('.').pop()?.toLowerCase() || ''
      const language = getLanguageFromExtension(extension)
      
      files.push({
        filename: contents.name,
        extension,
        language,
        size: contents.size
      })
    }
    
    console.log(`✅ Analyzed ${files.length} files in repo ${repoName}`)
    return files
    
  } catch (error) {
    console.error(`❌ Error analyzing repo ${repoName}:`, error)
    return []
  }
}

function getLanguageFromExtension(extension: string): string {
  const languageMap: { [key: string]: string } = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'jsx': 'React JSX',
    'tsx': 'React TSX',
    'py': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'cs': 'C#',
    'php': 'PHP',
    'rb': 'Ruby',
    'go': 'Go',
    'rs': 'Rust',
    'swift': 'Swift',
    'kt': 'Kotlin',
    'scala': 'Scala',
    'r': 'R',
    'm': 'MATLAB',
    'sql': 'SQL',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'sass': 'Sass',
    'less': 'Less',
    'json': 'JSON',
    'xml': 'XML',
    'yaml': 'YAML',
    'yml': 'YAML',
    'toml': 'TOML',
    'ini': 'INI',
    'sh': 'Shell',
    'bash': 'Bash',
    'zsh': 'Zsh',
    'ps1': 'PowerShell',
    'bat': 'Batch',
    'cmd': 'Batch',
    'md': 'Markdown',
    'txt': 'Text',
    'log': 'Log',
    'lock': 'Lock file',
    'gitignore': 'Git ignore',
    'dockerfile': 'Docker',
    'makefile': 'Makefile',
    'gradle': 'Gradle',
    'pom': 'Maven',
    'gemfile': 'Ruby Gemfile',
    'requirements': 'Python requirements',
    'package': 'Node.js package',
    'composer': 'PHP Composer',
    'cargo': 'Rust Cargo',
    'go.mod': 'Go module',
    'pubspec': 'Dart pubspec',
    'csproj': 'C# project',
    'vcxproj': 'C++ project',
    'sln': 'Visual Studio solution',
    'xcodeproj': 'Xcode project',
    'android': 'Android project',
    'ios': 'iOS project'
  }
  
  return languageMap[extension] || 'Unknown'
}

function detectTechnologies(repos: GitHubRepo[], fileAnalyses: FileAnalysis[]): {
  languages: { [key: string]: number }
  technologies: { [key: string]: number }
  frameworks: { [key: string]: number }
  databases: { [key: string]: number }
  tools: { [key: string]: number }
} {
  const languages: { [key: string]: number } = {}
  const technologies: { [key: string]: number } = {}
  const frameworks: { [key: string]: number } = {}
  const databases: { [key: string]: number } = {}
  const tools: { [key: string]: number } = {}
  
  // Count languages from repos
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1
    }
  })
  
  // Analyze file contents for technologies
  fileAnalyses.forEach(file => {
    // Count by file extension/language
    if (file.language && file.language !== 'Unknown') {
      technologies[file.language] = (technologies[file.language] || 0) + 1
    }
    
    // Detect frameworks, databases, and tools from filename patterns
    Object.entries(TECHNOLOGY_PATTERNS.frameworks).forEach(([name, pattern]) => {
      if (pattern.test(file.filename)) {
        frameworks[name] = (frameworks[name] || 0) + 1
      }
    })
    
    Object.entries(TECHNOLOGY_PATTERNS.databases).forEach(([name, pattern]) => {
      if (pattern.test(file.filename)) {
        databases[name] = (databases[name] || 0) + 1
      }
    })
    
    Object.entries(TECHNOLOGY_PATTERNS.tools).forEach(([name, pattern]) => {
      if (pattern.test(file.filename)) {
        tools[name] = (tools[name] || 0) + 1
      }
    })
  })
  
  return { languages, technologies, frameworks, databases, tools }
}

function calculateSkillScore(repos: GitHubRepo[], technologies: any): number {
  let score = 0
  
  // Base score from number of repos
  score += Math.min(repos.length * 5, 50)
  
  // Score from stars
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  score += Math.min(totalStars * 2, 30)
  
  // Score from forks
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  score += Math.min(totalForks * 1, 20)
  
  // Score from technology diversity
  const techCount = Object.keys(technologies.languages).length + 
                   Object.keys(technologies.frameworks).length +
                   Object.keys(technologies.databases).length +
                   Object.keys(technologies.tools).length
  score += Math.min(techCount * 3, 30)
  
  return Math.min(score, 100)
}

function generateRecommendations(technologies: any, skillScore: number): string[] {
  const recommendations: string[] = []
  
  // Check for missing important technologies
  if (!technologies.frameworks['React'] && !technologies.frameworks['Vue.js'] && !technologies.frameworks['Angular']) {
    recommendations.push('Consider learning a modern frontend framework like React, Vue.js, or Angular')
  }
  
  if (!technologies.databases['PostgreSQL'] && !technologies.databases['MySQL'] && !technologies.databases['MongoDB']) {
    recommendations.push('Learn a database technology - PostgreSQL for relational or MongoDB for NoSQL')
  }
  
  if (!technologies.tools['Docker']) {
    recommendations.push('Learn Docker for containerization and deployment')
  }
  
  if (!technologies.tools['GitHub Actions']) {
    recommendations.push('Implement CI/CD with GitHub Actions for automated testing and deployment')
  }
  
  if (skillScore < 50) {
    recommendations.push('Focus on building more projects and contributing to open source')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Great job! Consider learning advanced topics like system design or cloud architecture')
  }
  
  return recommendations
}

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()
    
    if (!username) {
      return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 })
    }
    
    console.log('🚀 Starting GitHub analysis for:', username)
    
    // Fetch user's repositories
    const repos = await fetchGitHubData(username)
    console.log('✅ Fetched repositories:', repos.length)
    
    if (repos.length === 0) {
      return NextResponse.json({ error: 'No repositories found for this username' }, { status: 404 })
    }
    
    // Analyze top repositories (limit to 10 to avoid rate limiting)
    const topRepos = repos.slice(0, 10)
    const fileAnalyses: FileAnalysis[] = []
    
    console.log('🔍 Analyzing repository contents...')
    for (const repo of topRepos) {
      try {
        const repoFiles = await analyzeRepoContent(username, repo.name)
        fileAnalyses.push(...repoFiles)
        console.log(`✅ Analyzed repo: ${repo.name} (${repoFiles.length} files)`)
      } catch (error) {
        console.warn(`⚠️ Failed to analyze repo ${repo.name}:`, error)
        // Continue with other repos
      }
    }
    
    // Detect technologies
    const technologies = detectTechnologies(repos, fileAnalyses)
    console.log('🔧 Detected technologies:', technologies)
    
    // Calculate skill score
    const skillScore = calculateSkillScore(repos, technologies)
    console.log('📊 Calculated skill score:', skillScore)
    
    // Generate recommendations
    const recommendations = generateRecommendations(technologies, skillScore)
    console.log('💡 Generated recommendations:', recommendations.length)
    
    // Calculate totals
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
    
    const analysis: SkillAnalysis = {
      username,
      totalRepos: repos.length,
      totalStars,
      totalForks,
      skillScore,
      skills: {
        languages: technologies.languages,
        frameworks: technologies.frameworks,
        databases: technologies.databases,
        tools: technologies.tools
      },
      topRepos: topRepos.map(repo => ({
        name: repo.name,
        description: repo.description || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Unknown',
        url: repo.html_url
      })).slice(0, 5), // Show top 5 repos
      recommendations
    }
    
    console.log('🎉 GitHub analysis completed successfully')
    return NextResponse.json(analysis)
    
  } catch (error) {
    console.error('❌ GitHub analysis error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return NextResponse.json({ error: 'GitHub username not found' }, { status: 404 })
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json({ error: 'GitHub API rate limit exceeded. Please try again later.' }, { status: 429 })
      }
      if (error.message.includes('API error')) {
        return NextResponse.json({ error: `GitHub API error: ${error.message}` }, { status: 500 })
      }
    }
    
    return NextResponse.json({ error: 'Failed to analyze GitHub profile. Please check the username and try again.' }, { status: 500 })
  }
}
