"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Sparkles, Users, Heart, Brain } from "lucide-react"

const questions = [
  {
    question: "How do you usually make decisions?",
    options: {
      Red: "Quickly and confidently",
      Yellow: "Based on what feels exciting",
      Green: "After getting everyone's input",
      Blue: "After analyzing all details",
    },
  },
  {
    question: "What role do you naturally take in a group?",
    options: {
      Red: "Leader or initiator",
      Yellow: "Motivator and entertainer",
      Green: "Supporter and listener",
      Blue: "Planner and researcher",
    },
  },
  {
    question: "How do you handle conflict?",
    options: {
      Red: "Confront it head-on",
      Yellow: "Make light of the situation",
      Green: "Avoid it and keep peace",
      Blue: "Analyze before responding",
    },
  },
  {
    question: "What motivates you the most?",
    options: {
      Red: "Winning and success",
      Yellow: "Fun and excitement",
      Green: "Helping others",
      Blue: "Accuracy and order",
    },
  },
  {
    question: "What's your biggest strength?",
    options: {
      Red: "Taking initiative",
      Yellow: "Creative thinking",
      Green: "Being supportive",
      Blue: "Being precise",
    },
  },
  {
    question: "What's your biggest challenge?",
    options: {
      Red: "Impatience",
      Yellow: "Lack of focus",
      Green: "Avoiding change",
      Blue: "Overthinking",
    },
  },
  {
    question: "What kind of work environment do you prefer?",
    options: {
      Red: "Fast-paced and competitive",
      Yellow: "Lively and collaborative",
      Green: "Stable and friendly",
      Blue: "Structured and quiet",
    },
  },
  {
    question: "How do you prepare for a task?",
    options: {
      Red: "Jump right in",
      Yellow: "Talk through ideas with others",
      Green: "Ask for feedback first",
      Blue: "Plan every detail",
    },
  },
  {
    question: "What do others often appreciate about you?",
    options: {
      Red: "Your leadership",
      Yellow: "Your positivity",
      Green: "Your reliability",
      Blue: "Your precision",
    },
  },
  {
    question: "What do you value most?",
    options: {
      Red: "Results and achievement",
      Yellow: "Joy and inspiration",
      Green: "Harmony and relationships",
      Blue: "Truth and logic",
    },
  },
]

const colorConfig = {
  Red: {
    bg: "bg-red-500",
    light: "bg-red-50",
    border: "border-red-200",
    hover: "hover:border-red-300 hover:bg-red-50",
    text: "text-red-600",
    icon: Users,
  },
  Yellow: {
    bg: "bg-yellow-500",
    light: "bg-yellow-50",
    border: "border-yellow-200",
    hover: "hover:border-yellow-300 hover:bg-yellow-50",
    text: "text-yellow-600",
    icon: Sparkles,
  },
  Green: {
    bg: "bg-green-500",
    light: "bg-green-50",
    border: "border-green-200",
    hover: "hover:border-green-300 hover:bg-green-50",
    text: "text-green-600",
    icon: Heart,
  },
  Blue: {
    bg: "bg-blue-500",
    light: "bg-blue-50",
    border: "border-blue-200",
    hover: "hover:border-blue-300 hover:bg-blue-50",
    text: "text-blue-600",
    icon: Brain,
  },
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ Red: 0, Yellow: 0, Green: 0, Blue: 0 })
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswer = (color: keyof typeof scores) => {
    setSelectedAnswer(color)

    // Add a small delay for visual feedback
    setTimeout(() => {
      setScores((prev) => ({ ...prev, [color]: prev[color] + 1 }))
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 300)
  }

  const getPercentages = () => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0)
    return Object.fromEntries(
      Object.entries(scores).map(([color, score]) => [color, ((score / total) * 100).toFixed(1)]),
    )
  }

  const getDominantType = () => {
    const maxScore = Math.max(...Object.values(scores))
    return Object.entries(scores).find(([, score]) => score === maxScore)?.[0] || "Red"
  }

  if (showResult) {
    const percentages = getPercentages()
    const dominantType = getDominantType() as keyof typeof colorConfig
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
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Take Quiz Again
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Share Results
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const q = questions[currentQuestion]

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{currentQuestion + 1}</span>
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>
            <CardTitle className="text-2xl font-light leading-relaxed">{q.question}</CardTitle>
            <CardDescription className="text-base">Choose the answer that best describes you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(q.options).map(([color, text]) => {
                const colorKey = color as keyof typeof colorConfig
                const config = colorConfig[colorKey]
                const IconComponent = config.icon
                const isSelected = selectedAnswer === color

                return (
                  <button
                    key={color}
                    onClick={() => handleAnswer(colorKey)}
                    disabled={selectedAnswer !== null}
                    className={`group relative p-6 text-left rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? `${config.border} ${config.light} scale-[0.98]`
                        : `border-border hover:border-muted-foreground/30 hover:bg-muted/30 hover:scale-[1.02]`
                    } ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? config.bg : "bg-muted group-hover:bg-muted-foreground/10"
                        }`}
                      >
                        <IconComponent className={`w-5 h-5 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium leading-relaxed">{text}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 rounded-xl border-2 border-primary/20 bg-primary/5" />
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
