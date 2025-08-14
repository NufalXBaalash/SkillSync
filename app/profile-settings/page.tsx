"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Calendar,
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Shield,
  Bell,
  Palette,
  Globe2,
  Download,
  Trash2
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProfileSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

export default function ProfileSettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const userData = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user?.email?.split('@')[0] || "User",
    email: user?.email || "user@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    company: "Tech Corp",
    title: "Senior Developer",
    education: "Bachelor's in Computer Science",
    graduationYear: "2020",
    website: "https://example.com",
    bio: "Passionate developer with 5+ years of experience in full-stack development. Love learning new technologies and building impactful solutions.",
    skills: ["React", "Node.js", "Python", "AWS", "Docker"],
    interests: ["Machine Learning", "Web Development", "Open Source", "Tech Conferences"]
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "preferences", label: "Preferences", icon: <Palette className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy", icon: <Shield className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> }
  ]

  const profileSections: ProfileSection[] = [
    { id: "basic", title: "Basic Information", description: "Name, email, and contact details", icon: <User className="w-4 h-4" />, completed: true },
    { id: "professional", title: "Professional Details", description: "Work experience and education", icon: <Briefcase className="w-4 h-4" />, completed: true },
    { id: "skills", title: "Skills & Interests", description: "Technical skills and areas of interest", icon: <GraduationCap className="w-4 h-4" />, completed: true },
    { id: "social", title: "Social Profiles", description: "LinkedIn, GitHub, and website", icon: <Globe className="w-4 h-4" />, completed: false },
    { id: "preferences", title: "Preferences", description: "Appearance and notification settings", icon: <Palette className="w-4 h-4" />, completed: false }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setIsEditing(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log("Account deletion requested")
    setShowDeleteConfirm(false)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <SidebarNavigation />
        
        {/* Main Content */}
        <div className="lg:ml-64">
          <div className="p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 skillsync-fade-in">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" 
                       style={{ backgroundColor: 'var(--primary)' }}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-h1 mb-2" style={{ color: 'var(--foreground)' }}>Profile Settings</h1>
                    <p className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Manage your profile information, preferences, and account settings to personalize your SkillSync experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Completion Overview */}
              <Card className="skillsync-card shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--success)' }} />
                    Profile Completion
                  </CardTitle>
                  <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                    Complete your profile to unlock more personalized features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profileSections.map((section) => (
                      <div
                        key={section.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          section.completed 
                            ? 'border-success/20 bg-success/5' 
                            : 'border-muted/20 bg-muted/5'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            section.completed 
                              ? 'bg-success/20' 
                              : 'bg-muted'
                          }`}>
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                              {section.title}
                            </h4>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                              {section.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: section.completed ? 'var(--success)' : 'var(--muted-foreground)',
                              color: 'white'
                            }}
                          >
                            {section.completed ? 'Completed' : 'Pending'}
                          </Badge>
                          {section.completed && (
                            <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Settings Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white hover:bg-gray-50 text-foreground border'
                    }`}
                    style={{ 
                      backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--card)',
                      color: activeTab === tab.id ? 'var(--primary-foreground)' : 'var(--foreground)',
                      borderColor: activeTab === tab.id ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Profile Information */}
                  {activeTab === "profile" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                              <User className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                              Basic Information
                            </CardTitle>
                            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                              Your personal and contact information
                            </CardDescription>
                          </div>
                          {!isEditing ? (
                            <Button
                              onClick={() => setIsEditing(true)}
                              variant="outline"
                              className="skillsync-btn-secondary"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit Profile
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="skillsync-btn-primary"
                              >
                                {isSaving ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() => setIsEditing(false)}
                                variant="outline"
                                className="skillsync-btn-secondary"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Avatar Section */}
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <Avatar className="w-24 h-24 border-4" style={{ borderColor: 'var(--border)' }}>
                                <AvatarImage src={userData.avatar} alt={userData.name} />
                                <AvatarFallback className="text-3xl font-semibold">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                              {isEditing && (
                                <Button
                                  size="sm"
                                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                                  style={{ backgroundColor: 'var(--primary)' }}
                                >
                                  <Camera className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            <div>
                              <h3 className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>{userData.name}</h3>
                              <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Profile picture</p>
                              <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>JPG, PNG or GIF. Max 2MB.</p>
                            </div>
                          </div>

                          {/* Form Fields */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                First Name
                              </Label>
                              <Input
                                id="firstName"
                                defaultValue={userData.name.split(" ")[0] || ""}
                                className="skillsync-input"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Last Name
                              </Label>
                              <Input
                                id="lastName"
                                defaultValue={userData.name.split(" ")[1] || ""}
                                className="skillsync-input"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="email" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Email Address
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                defaultValue={userData.email}
                                className="skillsync-input"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                defaultValue={userData.phone}
                                className="skillsync-input"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Location
                              </Label>
                              <Input
                                id="location"
                                defaultValue={userData.location}
                                className="skillsync-input"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="company" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Company
                              </Label>
                              <Input
                                id="company"
                                defaultValue={userData.company}
                                className="skillsync-input"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="title" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Job Title
                              </Label>
                              <Input
                                id="title"
                                defaultValue={userData.title}
                                className="skillsync-input"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="bio" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Bio
                              </Label>
                              <textarea
                                id="bio"
                                rows={4}
                                defaultValue={userData.bio}
                                className="skillsync-input resize-none"
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Skills & Interests */}
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <GraduationCap className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Skills & Interests
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Your technical skills and areas of interest
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Technical Skills
                              </Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {userData.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    className="px-3 py-1"
                                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                Areas of Interest
                              </Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {userData.interests.map((interest) => (
                                  <Badge
                                    key={interest}
                                    variant="outline"
                                    className="px-3 py-1"
                                    style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                                  >
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Preferences */}
                  {activeTab === "preferences" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Palette className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Appearance & Theme
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Customize how SkillSync looks and feels
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Dark Mode</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Switch to dark theme</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Compact Layout</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Use more compact spacing</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Animations</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Enable smooth animations</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Privacy */}
                  {activeTab === "privacy" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Shield className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Privacy & Data
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Control your data and privacy settings
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Data Analytics</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Help improve SkillSync with anonymous data</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Personalized Content</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Receive personalized recommendations</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full skillsync-btn-secondary">
                              <Download className="w-4 h-4 mr-2" />
                              Export My Data
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full skillsync-btn-secondary text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setShowDeleteConfirm(true)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete My Account
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Notifications */}
                  {activeTab === "notifications" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Bell className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Notification Preferences
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Choose how and when you want to be notified
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Email Notifications</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Receive updates via email</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Push Notifications</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Get notified about new features</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Weekly Reports</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Receive weekly progress summaries</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Save Success Message */}
                  {saveSuccess && (
                    <div className="flex items-center gap-2 p-4 rounded-lg text-sm" 
                         style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                      <CheckCircle className="w-4 h-4" />
                      Profile updated successfully!
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Profile Stats */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Profile Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Profile completion</span>
                        <Badge style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                          80%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Skills listed</span>
                        <Badge style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                          {userData.skills.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Assessments taken</span>
                        <Badge style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                          12
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Globe2 className="w-4 h-4 mr-2" />
                        Connect Social Profiles
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export Profile
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="skillsync-card shadow-2xl max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-h3 flex items-center text-red-600" style={{ color: 'var(--destructive)' }}>
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Delete Account
                </CardTitle>
                <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                  This action cannot be undone. All your data will be permanently deleted.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Are you sure you want to delete your account? This will remove all your:
                </p>
                <ul className="text-small space-y-1" style={{ color: 'var(--muted-foreground)' }}>
                  <li>• Assessment results and progress</li>
                  <li>• Profile information</li>
                  <li>• Learning history</li>
                  <li>• All associated data</li>
                </ul>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Yes, Delete Account
                  </Button>
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1 skillsync-btn-secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
