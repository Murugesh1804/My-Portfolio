"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Globe, Brain, Zap, Palette, GitBranch, Server } from "lucide-react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6 text-blue-500" />,
      skills: [
        { name: "Python", logo: "🐍", level: "Advanced" },
        { name: "JavaScript", logo: "🟨", level: "Advanced" },
        { name: "Java", logo: "☕", level: "Intermediate" },
        { name: "HTML", logo: "🌐", level: "Advanced" },
        { name: "CSS", logo: "🎨", level: "Advanced" }
      ]
    },
    {
      title: "Frontend Development",
      icon: <Globe className="h-6 w-6 text-green-500" />,
      skills: [
        { name: "React.js", logo: "⚛️", level: "Advanced" },
        { name: "Next.js", logo: "▲", level: "Intermediate" },
        { name: "Tailwind CSS", logo: "🎨", level: "Advanced" },
        { name: "Material-UI", logo: "🧩", level: "Intermediate" }
      ]
    },
    {
      title: "Backend Development",
      icon: <Server className="h-6 w-6 text-purple-500" />,
      skills: [
        { name: "Node.js", logo: "🟢", level: "Advanced" },
        { name: "Express.js", logo: "🚀", level: "Advanced" },
        { name: "REST APIs", logo: "🔌", level: "Advanced" },
        { name: "MongoDB", logo: "🍃", level: "Intermediate" },
        { name: "SQL", logo: "🗄️", level: "Intermediate" }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: <GitBranch className="h-6 w-6 text-orange-500" />,
      skills: [
        { name: "Git/GitHub", logo: "📚", level: "Advanced" },
        { name: "Postman", logo: "📮", level: "Intermediate" },
        { name: "Figma", logo: "🎨", level: "Intermediate" },
        { name: "VS Code", logo: "💻", level: "Advanced" }
      ]
    },
    {
      title: "Automation & AI",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      skills: [
        { name: "n8n", logo: "⚡", level: "Intermediate" },
        { name: "Machine Learning", logo: "🤖", level: "Intermediate" },
        { name: "LLaMA-70B", logo: "🧠", level: "Intermediate" },
        { name: "Data Engineering", logo: "📊", level: "Intermediate" }
      ]
    },
    {
      title: "Best Practices",
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      skills: [
        { name: "Agile", logo: "🔄", level: "Intermediate" },
        { name: "SDLC", logo: "🔄", level: "Intermediate" },
        { name: "API Documentation", logo: "📖", level: "Intermediate" },
        { name: "Code Reviews", logo: "👀", level: "Intermediate" },
        { name: "Responsive Design", logo: "📱", level: "Advanced" }
      ]
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "Beginner":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  return (
    <section id="skills" className="section-padding bg-muted/30 py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-heading mb-4">
          Skills & <span className="text-gradient">Technologies</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-24 h-1 bg-gradient-to-r from-primary to-purple-400 rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-3xl mx-auto text-lg">
          A comprehensive overview of my technical skills, programming languages, frameworks, and tools. 
          I continuously learn and adapt to new technologies to stay current in the ever-evolving tech landscape.
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group"
          >
            <Card className="hover-effect bg-secondary/50 border-none backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  {category.icon}
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between group/skill">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover/skill:scale-110 transition-transform">
                          {skill.logo}
                        </span>
                        <span className="font-medium group-hover/skill:text-primary transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <Badge className={`${getLevelColor(skill.level)} text-xs`}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Logo Marquee Animation */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-secondary/20 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Technologies I Work With</h3>
          <p className="text-muted-foreground">Continuous learning and adaptation to new tools and frameworks</p>
        </div>
        
        {/* Marquee Container */}
        <div className="relative">
          {/* First Row - Fast */}
          <div className="flex animate-marquee-fast">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-8 mx-4">
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">🐍</span>
                  <span className="font-medium">Python</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">⚛️</span>
                  <span className="font-medium">React</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">🟢</span>
                  <span className="font-medium">Node.js</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">🎨</span>
                  <span className="font-medium">Tailwind</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">🍃</span>
                  <span className="font-medium">MongoDB</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">🤖</span>
                  <span className="font-medium">Machine Learning</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second Row - Slow */}
          <div className="flex animate-marquee-slow mt-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-8 mx-4">
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">🚀</span>
                  <span className="font-medium">Express.js</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">▲</span>
                  <span className="font-medium">Next.js</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">📚</span>
                  <span className="font-medium">GitHub</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">⚡</span>
                  <span className="font-medium">n8n</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">🧠</span>
                  <span className="font-medium">LLaMA-70B</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl">📊</span>
                  <span className="font-medium">Data Engineering</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        variants={itemVariants}
        className="text-center mt-16"
      >
        <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Always Learning & Growing</h3>
            <p className="text-muted-foreground mb-6">
              I believe in continuous learning and staying updated with the latest technologies. 
              My skill set is constantly evolving as I work on new projects and explore emerging technologies.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Programming Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4+</div>
                <div className="text-sm text-muted-foreground">Frontend Frameworks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3+</div>
                <div className="text-sm text-muted-foreground">Backend Technologies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Tools & Platforms</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

