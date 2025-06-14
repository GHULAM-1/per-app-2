import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Users, Heart, Brain, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            Personality Assessment
          </div>
          <h1 className="text-5xl font-light tracking-tight text-foreground">
            Discover Your
            <span className="block text-primary">True Colors</span>
          </h1>
          <p className="text-muted-foreground text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Take our comprehensive personality quiz to understand your unique traits, strengths, and how you interact
            with the world around you.
          </p>
        </div>

        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500  to-blue-500" />
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-light text-center">Four Personality Dimensions</CardTitle>
            <CardDescription className="text-center text-lg">
              Understanding the spectrum of human personality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-1">The Leader</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Bold, driven, action-oriented leaders who thrive on challenges and results
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-yellow-50/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-600 mb-1">The Inspirer</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Energetic, social, optimistic, and creative individuals who motivate others
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-600 mb-1">The Supporter</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Calm, kind, loyal, harmony-loving team players who value relationships
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">The Analyst</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Logical, detailed, cautious, and perfectionist thinkers who value accuracy
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">Ready to discover your personality type?</p>
            <p className="text-sm text-muted-foreground">Takes about 3-5 minutes • 10 questions</p>
          </div>
          <Link href="/quiz">
            <Button size="lg" className="text-lg px-8 py-6 group">
              Begin Assessment
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// gh