"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Award, Calendar, Zap, CheckCircle } from "lucide-react"

interface ProgressData {
  overallProgress: number
  currentStreak: number
  totalPoints: number
  level: string
  completedMilestones: number
  totalMilestones: number
  skillsLearned: number
  simulationsCompleted: number
  weeklyGoal: number
  weeklyProgress: number
}

interface ProgressTrackerProps {
  data: ProgressData
  variant?: "compact" | "detailed"
  showWeeklyGoal?: boolean
}

export default function ProgressTracker({ data, variant = "detailed", showWeeklyGoal = true }: ProgressTrackerProps) {
  const progressColor =
    data.overallProgress >= 80 ? "text-green-600" : data.overallProgress >= 60 ? "text-blue-600" : "text-orange-600"

  if (variant === "compact") {
    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Your Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span className={progressColor}>{data.overallProgress}%</span>
            </div>
            <Progress value={data.overallProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">{data.currentStreak}</div>
              <div className="text-xs text-gray-500">Day Streak</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{data.completedMilestones}</div>
              <div className="text-xs text-gray-500">Milestones</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{data.skillsLearned}</div>
              <div className="text-xs text-gray-500">Skills</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Progress Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Learning Progress</span>
          </CardTitle>
          <CardDescription>Track your journey to career success</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Overall Completion</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{data.level}</Badge>
                <span className={`font-bold ${progressColor}`}>{data.overallProgress}%</span>
              </div>
            </div>
            <Progress value={data.overallProgress} className="h-4" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{data.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>

            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {data.completedMilestones}/{data.totalMilestones}
              </div>
              <div className="text-sm text-gray-600">Milestones</div>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{data.skillsLearned}</div>
              <div className="text-sm text-gray-600">Skills Learned</div>
            </div>

            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{data.totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
          </div>

          {/* Weekly Goal */}
          {showWeeklyGoal && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Weekly Goal</span>
                </span>
                <span className="text-sm text-gray-600">
                  {data.weeklyProgress}/{data.weeklyGoal} hours
                </span>
              </div>
              <Progress value={(data.weeklyProgress / data.weeklyGoal) * 100} className="h-2" />
              <p className="text-xs text-gray-500">
                {data.weeklyGoal - data.weeklyProgress > 0
                  ? `${data.weeklyGoal - data.weeklyProgress} hours left this week`
                  : "Weekly goal achieved! 🎉"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievement Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-medium text-sm">Quick Learner</p>
                <p className="text-xs text-gray-600">Completed 3 milestones in one week</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-sm">Simulation Master</p>
                <p className="text-xs text-gray-600">Scored 80+ on {data.simulationsCompleted} simulations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Consistent Learner</p>
                <p className="text-xs text-gray-600">{data.currentStreak}-day learning streak</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
