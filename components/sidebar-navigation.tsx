"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Target, 
  TrendingUp, 
  Map, 
  Play, 
  ClipboardCheck, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Home,
  BarChart3,
  BookOpen,
  User,
  ChevronDown,
  Github,
  Linkedin,
  Brain,
  Rocket,
  Award,
  Calendar,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

interface NavigationItem {
  label: string
  href: string
  icon: React.ReactNode
  description?: string
  badge?: string
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-5 h-5" />,
    description: "Overview and progress tracking"
  },
  {
    label: "Skill Assessment",
    href: "/assessment",
    icon: <ClipboardCheck className="w-5 h-5" />,
    description: "Evaluate your current skills",
    badge: "New"
  },
  {
    label: "Profile Analysis",
    href: "/profile-analysis",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Analyze GitHub & LinkedIn profiles"
  },
  {
    label: "Career Roadmap",
    href: "/roadmap",
    icon: <Map className="w-5 h-5" />,
    description: "Personalized learning path"
  },
  {
    label: "Job Simulations",
    href: "/simulation",
    icon: <Play className="w-5 h-5" />,
    description: "Practice real-world scenarios"
  },
  {
    label: "AI Chat",
    href: "/ai-chat",
    icon: <Brain className="w-5 h-5" />,
    description: "Get personalized career advice"
  }
]

const secondaryItems: NavigationItem[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
    description: "Account preferences"
  },
  {
    label: "Help & Support",
    href: "/help",
    icon: <HelpCircle className="w-5 h-5" />,
    description: "Get help and support"
  }
]

export default function SidebarNavigation() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const userData = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user?.email?.split('@')[0] || "User",
    email: user?.email || "user@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  const isActivePage = (href: string) => pathname === href

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:flex">
        {/* Left Sidebar */}
        <aside className={`fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 ease-out z-50 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`} style={{ 
          borderColor: 'var(--border)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
            {!isSidebarCollapsed && (
              <Link href="/dashboard" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110" 
                     style={{ backgroundColor: 'var(--primary)' }}>
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">SkillSync</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActivePage(item.href)
                    ? 'bg-gray-50 border-l-4'
                    : 'hover:bg-gray-50 hover:shadow-sm'
                }`} style={{ 
                  borderLeftColor: isActivePage(item.href) ? 'var(--primary)' : 'transparent'
                }}>
                  <div className="flex items-center justify-center w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                       style={{ color: isActivePage(item.href) ? 'var(--primary)' : 'var(--foreground)' }}>
                    {item.icon}
                  </div>
                  {!isSidebarCollapsed && (
                    <>
                      <span className={`ml-3 font-medium text-sm transition-colors duration-200 ${
                        isActivePage(item.href) ? 'text-primary' : 'text-foreground'
                      }`} style={{ 
                        color: isActivePage(item.href) ? 'var(--primary)' : 'var(--foreground)' 
                      }}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge className="ml-auto text-xs px-2 py-1 rounded-full" style={{ 
                          backgroundColor: 'var(--accent)', 
                          color: 'var(--accent-foreground)' 
                        }}>
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-r-4 border-l-4 border-t-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Secondary Navigation */}
          <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: 'var(--border)' }}>
            {secondaryItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="group relative flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:shadow-sm">
                  <div className="flex items-center justify-center w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                       style={{ color: 'var(--muted-foreground)' }}>
                    {item.icon}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="ml-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-r-4 border-l-4 border-t-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <Avatar className="w-9 h-9 border-2 transition-all duration-200 hover:scale-105" 
                      style={{ borderColor: 'var(--border)' }}>
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-sm font-medium">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{userData.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{userData.email}</p>
                </div>
              )}
              {!isSidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`p-1.5 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 ${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  }`}
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Profile Dropdown - Inline Expandable Section */}
            {isProfileMenuOpen && !isSidebarCollapsed && (
              <div className="mt-3 pt-3 border-t animate-in slide-in-from-top-2 duration-200" style={{ borderColor: 'var(--border)' }}>
                <div className="space-y-2">
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start text-sm rounded-lg h-9 hover:bg-gray-50">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard?tab=profile">
                    <Button variant="ghost" className="w-full justify-start text-sm rounded-lg h-9 hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-sm rounded-lg h-9 hover:bg-gray-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Preferences
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={signOut}
                    className="w-full justify-start text-sm rounded-lg h-9 hover:bg-red-50 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Wrapper */}
        <div className="flex-1 ml-64 transition-all duration-300 ease-out" style={{ marginLeft: isSidebarCollapsed ? '4rem' : '16rem' }}>
          {/* Content will be rendered here */}
        </div>
      </div>

      {/* Mobile Navigation */}
      <header className="lg:hidden border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110" 
                   style={{ backgroundColor: 'var(--primary)' }}>
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">SkillSync</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <Bell className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs rounded-full" style={{ 
                  backgroundColor: 'var(--destructive)', 
                  color: 'var(--destructive-foreground)' 
                }}>3</Badge>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 pb-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <nav className="space-y-1 mt-4">
                {navigationItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActivePage(item.href)
                        ? 'bg-gray-50 border-l-4'
                        : 'hover:bg-gray-50 hover:shadow-sm'
                    }`} style={{ 
                      borderLeftColor: isActivePage(item.href) ? 'var(--primary)' : 'transparent'
                    }}>
                      <div className="flex items-center justify-center w-5 h-5" 
                           style={{ color: isActivePage(item.href) ? 'var(--primary)' : 'var(--foreground)' }}>
                        {item.icon}
                      </div>
                      <span className={`ml-3 font-medium text-sm ${
                        isActivePage(item.href) ? 'text-primary' : 'text-foreground'
                      }`} style={{ 
                        color: isActivePage(item.href) ? 'var(--primary)' : 'var(--foreground)' 
                      }}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge className="ml-auto text-xs px-2 py-1 rounded-full" style={{ 
                          backgroundColor: 'var(--accent)', 
                          color: 'var(--accent-foreground)' 
                        }}>
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
                
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center space-x-3 p-4">
                    <Avatar className="w-8 h-8 border-2" style={{ borderColor: 'var(--border)' }}>
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="text-sm font-medium">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{userData.name}</p>
                      <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4 space-y-1">
                    <Link href="/dashboard?tab=profile">
                      <Button variant="ghost" className="w-full justify-start text-sm rounded-lg h-9 hover:bg-gray-50">
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-sm rounded-lg h-9 hover:bg-gray-50">
                      <Settings className="w-4 h-4 mr-2" />
                      Preferences
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={signOut}
                      className="w-full justify-start text-sm rounded-lg h-9 hover:bg-red-50 text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
