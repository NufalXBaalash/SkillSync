"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  TrendingUp,
  Award,
  Clock,
  Play,
  BookOpen,
  CheckCircle,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Bell,
  Star,
  ArrowRight,
  Github,
  Zap,
  ClipboardCheck,
  Map,
  Monitor,
  Rocket,
  Lightbulb,
  Calendar,
} from "lucide-react"

export default function DesignSystemExamples() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8 skillsync-fade-in">
          <h1 className="text-h1 mb-4 gradient-text">
            SkillSync Design System
          </h1>
          <p className="text-body max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            A comprehensive guide to implementing consistent, professional design across the SkillSync application
          </p>
        </div>

        {/* Typography Examples */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Typography Scale
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Consistent text hierarchy for better readability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-h1" style={{ color: 'var(--foreground)' }}>Heading 1 - Main Page Titles</h1>
              <h2 className="text-h2" style={{ color: 'var(--foreground)' }}>Heading 2 - Section Titles</h2>
              <h3 className="text-h3" style={{ color: 'var(--foreground)' }}>Heading 3 - Subsection Titles</h3>
              <p className="text-body" style={{ color: 'var(--foreground)' }}>
                Body text - This is the standard paragraph text used throughout the application. 
                It provides good readability with appropriate line height and spacing.
              </p>
              <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                Body Small - Used for secondary information, descriptions, and helper text.
              </p>
              <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>
                Small - Used for labels, timestamps, and metadata.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Color System Examples */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Color Palette
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Semantic colors for consistent user experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg mx-auto mb-2" 
                  style={{ backgroundColor: 'var(--primary)' }}
                ></div>
                <p className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Primary</p>
                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>#4A90E2</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg mx-auto mb-2" 
                  style={{ backgroundColor: 'var(--secondary)' }}
                ></div>
                <p className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Secondary</p>
                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>#2AB7A9</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg mx-auto mb-2" 
                  style={{ backgroundColor: 'var(--accent)' }}
                ></div>
                <p className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Accent</p>
                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>#F4D35E</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg mx-auto mb-2" 
                  style={{ backgroundColor: 'var(--success)' }}
                ></div>
                <p className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Success</p>
                <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>#3FB984</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Examples */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Button System
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Consistent button styles for different actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button className="skillsync-btn-primary">
                Primary Action
              </Button>
              <Button className="skillsync-btn-secondary">
                Secondary Action
              </Button>
              <Button variant="outline" className="skillsync-btn-secondary">
                Outline Button
              </Button>
              <Button size="sm" className="skillsync-btn-primary">
                Small Button
              </Button>
              <Button size="lg" className="skillsync-btn-primary">
                Large Button
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Form Elements
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Consistent input styling and form patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: 'var(--foreground)' }}>Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="skillsync-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" style={{ color: 'var(--foreground)' }}>Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="skillsync-input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" style={{ color: 'var(--foreground)' }}>Bio</Label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself..."
                className="skillsync-input min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Badge Examples */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Badge System
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Status indicators and category labels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge className="skillsync-badge">Default</Badge>
              <Badge className="skillsync-badge-success">Success</Badge>
              <Badge className="skillsync-badge-error">Error</Badge>
              <Badge variant="outline" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
                Outline
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Progress and Status */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Progress & Status
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Visual indicators for user progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-body-sm" style={{ color: 'var(--foreground)' }}>Skill Progress</span>
                <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-body-sm" style={{ color: 'var(--foreground)' }}>Course Completion</span>
                <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Navigation Examples */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Navigation Elements
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Consistent navigation patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3" style={{ backgroundColor: 'var(--muted)' }}>
                <TabsTrigger value="overview" className="skillsync-nav-link">Overview</TabsTrigger>
                <TabsTrigger value="progress" className="skillsync-nav-link">Progress</TabsTrigger>
                <TabsTrigger value="settings" className="skillsync-nav-link">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                  Overview content goes here with consistent styling.
                </p>
              </TabsContent>
              <TabsContent value="progress" className="mt-4">
                <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                  Progress tracking and analytics.
                </p>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                  User preferences and account settings.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Animation Examples */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4 mb-8">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Animation System
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Smooth, professional animations for better UX
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg skillsync-scale-in" style={{ backgroundColor: 'var(--muted)' }}>
                <h4 className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>Scale In</h4>
                <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Elements appear with a subtle scale effect
                </p>
              </div>
              <div className="text-center p-4 rounded-lg skillsync-slide-in" style={{ backgroundColor: 'var(--muted)' }}>
                <h4 className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>Slide In</h4>
                <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Content slides in from the left
                </p>
              </div>
              <div className="text-center p-4 rounded-lg skillsync-fade-in" style={{ backgroundColor: 'var(--muted)' }}>
                <h4 className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>Fade In</h4>
                <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Smooth fade-in with upward movement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1">
          <CardHeader>
            <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>
              Implementation Guidelines
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              Best practices for using the design system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-h3 mb-3" style={{ color: 'var(--foreground)' }}>✅ Do's</h4>
                <ul className="space-y-2 text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                  <li>• Use consistent spacing with the spacing system</li>
                  <li>• Apply appropriate typography classes</li>
                  <li>• Use semantic colors for different states</li>
                  <li>• Implement smooth animations</li>
                  <li>• Maintain consistent border radius</li>
                </ul>
              </div>
              <div>
                <h4 className="text-h3 mb-3" style={{ color: 'var(--foreground)' }}>❌ Don'ts</h4>
                <ul className="space-y-2 text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                  <li>• Don't use hardcoded colors</li>
                  <li>• Don't skip hover states</li>
                  <li>• Don't use inconsistent spacing</li>
                  <li>• Don't forget dark mode</li>
                  <li>• Don't use jarring animations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
