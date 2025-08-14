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
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Save,
  Camera,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const userData = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user?.email?.split('@')[0] || "User",
    email: user?.email || "user@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "data", label: "Data & Privacy", icon: <Globe className="w-4 h-4" /> }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <SidebarNavigation />
        
        {/* Main Content */}
        <div className="lg:ml-64">
          <div className="p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8 skillsync-fade-in">
                <h1 className="text-h1 mb-3" style={{ color: 'var(--foreground)' }}>Settings</h1>
                <p className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Manage your account settings, preferences, and privacy options.
                </p>
              </div>

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

              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div className="space-y-6 skillsync-fade-in">
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <User className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                        Profile Information
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                        Update your personal information and profile picture
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Avatar className="w-20 h-20 border-4" style={{ borderColor: 'var(--border)' }}>
                            <AvatarImage src={userData.avatar} alt={userData.name} />
                            <AvatarFallback className="text-2xl font-semibold">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                            style={{ backgroundColor: 'var(--primary)' }}
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
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
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                            Bio
                          </Label>
                          <textarea
                            id="bio"
                            rows={3}
                            placeholder="Tell us about yourself..."
                            className="skillsync-input resize-none"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Notifications Settings */}
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
                        <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <div>
                            <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Marketing Updates</h4>
                            <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>News about new courses and features</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6 skillsync-fade-in">
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <Shield className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                        Security Settings
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                        Manage your password and security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                            Current Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              className="skillsync-input pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                            New Password
                          </Label>
                          <Input
                            id="newPassword"
                            type="password"
                            className="skillsync-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="skillsync-input"
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <h4 className="font-semibold text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>Password Requirements</h4>
                        <ul className="text-small space-y-1" style={{ color: 'var(--muted-foreground)' }}>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" style={{ color: 'var(--success)' }} />
                            At least 8 characters long
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" style={{ color: 'var(--success)' }} />
                            Contains uppercase and lowercase letters
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" style={{ color: 'var(--success)' }} />
                            Includes numbers and special characters
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === "appearance" && (
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

              {/* Data & Privacy Settings */}
              {activeTab === "data" && (
                <div className="space-y-6 skillsync-fade-in">
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <Globe className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                        Data & Privacy
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
                        <Button variant="outline" className="w-full skillsync-btn-secondary">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete My Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex items-center gap-4">
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="skillsync-btn-primary px-8 py-3"
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
                
                {saveSuccess && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--success)' }}>
                    <CheckCircle className="w-4 h-4" />
                    Changes saved successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
