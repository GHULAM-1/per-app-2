"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Users, Heart, Brain } from "lucide-react"

const colorConfig = {
  Red: {
    bg: "bg-red-500",
    light: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    icon: Users,
  },
  Yellow: {
    bg: "bg-yellow-500",
    light: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-600",
    icon: Sparkles,
  },
  Green: {
    bg: "bg-green-500",
    light: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    icon: Heart,
  },
  Blue: {
    bg: "bg-blue-500",
    light: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    icon: Brain,
  },
}

export default function Results() {
  const searchParams = useSearchParams()
  const [scores, setScores] = useState({ Red: 0, Yellow: 0, Green: 0, Blue: 0 })
  const [dominantType, setDominantType] = useState<"Red" | "Yellow" | "Green" | "Blue">("Red")

  useEffect(() => {
    const Red = Number.parseInt(searchParams.get("Red") || "0")
    const Yellow = Number.parseInt(searchParams.get("Yellow") || "0")
    const Green = Number.parseInt(searchParams.get("Green") || "0")
    const Blue = Number.parseInt(searchParams.get("Blue") || "0")

    setScores({ Red, Yellow, Green, Blue })

    // Find dominant type
    const maxScore = Math.max(Red, Yellow, Green, Blue)
    if (Red === maxScore) setDominantType("Red")
    else if (Yellow === maxScore) setDominantType("Yellow")
    else if (Green === maxScore) setDominantType("Green")
    else setDominantType("Blue")
  }, [searchParams])

  const getPercentages = () => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0)
    return Object.fromEntries(
      Object.entries(scores).map(([color, score]) => [color, total > 0 ? ((score / total) * 100).toFixed(1) : "0"]),
    )
  }

  const percentages = getPercentages()
  const config = colorConfig[dominantType]
  const IconComponent = config.icon

  const typeDescriptions = {
    Red: {
      title: "The Leader",
      description:
        "You're a natural leader who thrives on challenges and results. You're decisive, confident, and drive for success. You prefer to take charge and make things happen.",
      traits: ["Decisive", "Goal-oriented", "Confident", "Direct", "Results-focused"],
    },
    Yellow: {
      title: "The Inspirer",
      description:
        "You're enthusiastic and optimistic, bringing energy and creativity to everything you do. People are drawn to your positive spirit and innovative ideas.",
      traits: ["Enthusiastic", "Creative", "Optimistic", "Social", "Inspiring"],
    },
    Green: {
      title: "The Supporter",
      description:
        "You're a steady, reliable team player who values harmony and relationships. You're the one people turn to for support and understanding.",
      traits: ["Reliable", "Patient", "Supportive", "Loyal", "Harmonious"],
    },
    Blue: {
      title: "The Analyst",
      description:
        "You're analytical and thorough, valuing accuracy and quality. You think before you act and strive for perfection in everything you do.",
      traits: ["Analytical", "Precise", "Systematic", "Quality-focused", "Thoughtful"],
    },
  }

  const typeInfo = typeDescriptions[dominantType]

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            Quiz Complete
          </div>
          <h1 className="text-4xl font-light tracking-tight">Your Personality Profile</h1>
          <p className="text-muted-foreground text-lg">Discover your unique traits and characteristics</p>
        </div>

        {/* Main Result Card */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className={`h-2 ${config.bg}`} />
          <CardHeader className="text-center pb-6">
            <div
              className={`w-20 h-20 rounded-full ${config.bg} mx-auto mb-6 flex items-center justify-center shadow-lg`}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-light mb-2">
              {dominantType} - {typeInfo.title}
            </CardTitle>
            <CardDescription className="text-lg leading-relaxed max-w-2xl mx-auto">
              {typeInfo.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Key Traits */}
            <div className="text-center">
              <h3 className="font-semibold mb-4 text-lg">Your Key Traits</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {typeInfo.traits.map((trait, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${config.light} ${config.text} border ${config.border}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Score Breakdown */}
            <div>
              <h3 className="font-semibold mb-6 text-lg text-center">Complete Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(percentages).map(([color, percent]) => {
                  const colorKey = color as keyof typeof colorConfig
                  const colorConf = colorConfig[colorKey]
                  const ColorIcon = colorConf.icon

                  return (
                    <div key={color} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${colorConf.bg} flex items-center justify-center`}>
                            <ColorIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{color}</span>
                        </div>
                        <span className="text-2xl font-bold text-muted-foreground">{percent}%</span>
                      </div>
                      <Progress value={Number.parseFloat(percent)} className="h-3" />
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quiz">
            <Button size="lg" className="w-full sm:w-auto">
              Take Quiz Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
