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
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

interface NavigationItem {
  label: string
  href: string
  icon: React.ReactNode
  description?: string
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
    description: "Evaluate your current skills"
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
  }
]

export default function SharedNavigation() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

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
      {/* Desktop Navigation */}
      <header className="hidden lg:block border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-serif font-bold gradient-text">SkillSync</span>
              </Link>
              
              {/* Main Navigation */}
              <nav className="flex items-center space-x-1 ml-8">
                {navigationItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActivePage(item.href) ? "default" : "ghost"}
                      className={`relative group ${
                        isActivePage(item.href) 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActivePage(item.href) && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                      )}
                      
                      {/* Hover tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.description}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                      </div>
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs">3</Badge>
              </Button>
              
              {/* Profile Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-blue-50"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-sm">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <span className="hidden xl:block text-sm font-medium">{userData.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {isProfileMenuOpen && (
                  <Card className="absolute right-0 top-full mt-2 w-64 shadow-lg border-0">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 pb-3 border-b">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={userData.avatar} alt={userData.name} />
                            <AvatarFallback>{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{userData.name}</p>
                            <p className="text-xs text-gray-500">{userData.email}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Link href="/dashboard">
                            <Button variant="ghost" className="w-full justify-start text-sm">
                              <Home className="w-4 h-4 mr-2" />
                              Dashboard
                            </Button>
                          </Link>
                          <Link href="/dashboard?tab=profile">
                            <Button variant="ghost" className="w-full justify-start text-sm">
                              <User className="w-4 h-4 mr-2" />
                              Profile Settings
                            </Button>
                          </Link>
                          <Button variant="ghost" className="w-full justify-start text-sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Preferences
                          </Button>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <Button 
                            variant="ghost" 
                            onClick={signOut}
                            className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className="lg:hidden border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-serif font-bold gradient-text">SkillSync</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs">3</Badge>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 pb-4 border-t">
              <nav className="space-y-2 mt-4">
                {navigationItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActivePage(item.href) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActivePage(item.href) 
                          ? "bg-blue-600 text-white" 
                          : "hover:bg-blue-50"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Button>
                  </Link>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-3 p-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="text-sm">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link href="/dashboard?tab=profile">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Preferences
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={signOut}
                      className="w-full justify-start text-sm text-red-600 hover:text-red-700"
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
