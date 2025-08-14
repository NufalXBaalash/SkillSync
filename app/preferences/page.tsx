"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Palette,
  Bell,
  Globe,
  Shield,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Tablet,
  Languages,
  Clock,
  Zap,
  Settings,
  User,
  Lock,
  Download,
  Upload
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

interface PreferenceCategory {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  count: number
}

export default function PreferencesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("appearance")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const userData = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user?.email?.split('@')[0] || "User",
    email: user?.email || "user@example.com",
  }

  const tabs = [
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy", icon: <Shield className="w-4 h-4" /> },
    { id: "accessibility", label: "Accessibility", icon: <Eye className="w-4 h-4" /> },
    { id: "advanced", label: "Advanced", icon: <Settings className="w-4 h-4" /> }
  ]

  const preferenceCategories: PreferenceCategory[] = [
    { id: "appearance", title: "Appearance", description: "Theme, layout, and visual preferences", icon: <Palette className="w-4 h-4" />, count: 8 },
    { id: "notifications", title: "Notifications", description: "How and when you get notified", icon: <Bell className="w-4 h-4" />, count: 12 },
    { id: "privacy", title: "Privacy", description: "Data sharing and privacy controls", icon: <Shield className="w-4 h-4" />, count: 6 },
    { id: "accessibility", title: "Accessibility", description: "Reading and interaction preferences", icon: <Eye className="w-4 h-4" />, count: 9 },
    { id: "advanced", title: "Advanced", description: "Developer and power user options", icon: <Settings className="w-4 h-4" />, count: 4 }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const resetToDefaults = () => {
    // Reset preferences to defaults
    console.log("Resetting preferences to defaults")
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
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-h1 mb-2" style={{ color: 'var(--foreground)' }}>Preferences</h1>
                    <p className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Customize your SkillSync experience with detailed preference settings and personalization options.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preference Categories Overview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {preferenceCategories.map((category) => (
                  <Card 
                    key={category.id}
                    className={`skillsync-card shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl ${
                      activeTab === category.id ? 'ring-2' : ''
                    }`}
                    style={{ 
                      ringColor: activeTab === category.id ? 'var(--primary)' : 'transparent'
                    }}
                    onClick={() => setActiveTab(category.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                             style={{ backgroundColor: 'var(--muted)' }}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>
                            {category.title}
                          </h3>
                          <p className="text-xs mb-2" style={{ color: 'var(--muted-foreground)' }}>
                            {category.description}
                          </p>
                          <Badge className="text-xs" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                            {category.count} settings
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Appearance Settings */}
                  {activeTab === "appearance" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Palette className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Theme & Colors
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Choose your preferred color scheme and theme
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div className="flex items-center gap-3">
                                <Sun className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                                <div>
                                  <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Light Theme</h4>
                                  <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Clean, bright interface</p>
                                </div>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div className="flex items-center gap-3">
                                <Moon className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
                                <div>
                                  <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Dark Theme</h4>
                                  <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Easy on the eyes</p>
                                </div>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div className="flex items-center gap-3">
                                <Monitor className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                <div>
                                  <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>System Default</h4>
                                  <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Follows your OS setting</p>
                                </div>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Zap className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Layout & Spacing
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Customize the layout and spacing of elements
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Compact Layout</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Use more compact spacing</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Wide Layout</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Use full width of screen</p>
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

                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Smartphone className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Responsive Behavior
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            How the interface adapts to different screen sizes
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Mobile Optimized</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Optimize for mobile devices</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Touch Friendly</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Larger touch targets</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Notification Settings */}
                  {activeTab === "notifications" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Bell className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Notification Channels
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Choose how you want to receive notifications
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
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Get notified in real-time</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>In-App Notifications</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Show notifications in the app</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Clock className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Notification Timing
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Control when you receive notifications
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Quiet Hours</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>No notifications during quiet hours</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Batch Notifications</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Group notifications together</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  {activeTab === "privacy" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Shield className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
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
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Third-Party Services</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Allow third-party integrations</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Accessibility Settings */}
                  {activeTab === "accessibility" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Eye className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Visual Preferences
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Customize visual elements for better accessibility
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>High Contrast</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Use high contrast colors</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Large Text</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Increase text size</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Reduce Motion</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Minimize animations</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Advanced Settings */}
                  {activeTab === "advanced" && (
                    <div className="space-y-6 skillsync-fade-in">
                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Settings className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Developer Options
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Advanced settings for developers and power users
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Debug Mode</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Enable debug information</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                              <div>
                                <h4 className="font-semibold text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Performance Monitoring</h4>
                                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Track app performance</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="skillsync-card shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Download className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                            Data Management
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Manage your data and export options
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full skillsync-btn-secondary">
                              <Download className="w-4 h-4 mr-2" />
                              Export All Data
                            </Button>
                            <Button variant="outline" className="w-full skillsync-btn-secondary">
                              <Upload className="w-4 h-4 mr-2" />
                              Import Data
                            </Button>
                            <Button variant="outline" className="w-full skillsync-btn-secondary">
                              <Settings className="w-4 h-4 mr-2" />
                              Reset to Defaults
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
                          Save Preferences
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={resetToDefaults}
                      variant="outline"
                      className="skillsync-btn-secondary px-6 py-3"
                    >
                      Reset to Defaults
                    </Button>
                    
                    {saveSuccess && (
                      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--success)' }}>
                        <CheckCircle className="w-4 h-4" />
                        Preferences saved successfully!
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Current Settings Summary */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Current Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Theme</span>
                        <Badge style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                          Light
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Notifications</span>
                        <Badge style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                          Enabled
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Privacy</span>
                        <Badge style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                          Standard
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
                        <Download className="w-4 h-4 mr-2" />
                        Export Settings
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Upload className="w-4 h-4 mr-2" />
                        Import Settings
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Advanced Options
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Help & Support */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Globe className="w-4 h-4 mr-2" />
                        Documentation
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Bell className="w-4 h-4 mr-2" />
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
