"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Trophy, Brain, Zap, Mail, Database, Globe, Code, Smartphone } from "lucide-react"

export default function Projects() {
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

  const projects = [
    {
      title: "PredictIt – Crop Yield Prediction Platform",
      description: "A machine learning-powered platform that predicts crop yields with 98% accuracy using Random Forest algorithms. Built during SIMATS Hackathon 2024 where it secured 1st place among 50+ teams.",
      features: [
        "Machine Learning model with 98% accuracy",
        "Responsive frontend design in Figma",
        "Crop yield prediction for multiple crops",
        "User-friendly interface for farmers",
        "Data-driven insights and recommendations"
      ],
      tech: ["HTML", "CSS", "Flask", "Python", "Machine Learning", "Random Forest"],
      image: "/placeholder.jpg",
      github: "https://github.com/Murugesh1804/predictit",
      live: null,
      achievement: "🥇 1st Place - SIMATS Hackathon 2024",
      category: "AI/ML",
      icon: <Brain className="h-8 w-8 text-green-500" />
    },
    {
      title: "ResqAI – Emergency Response Dashboard",
      description: "A real-time disaster management system that integrates weather APIs and disaster databases to provide emergency services information with interactive charts, maps, and geolocation features.",
      features: [
        "Real-time disaster management system",
        "Weather API integration",
        "Interactive charts and maps",
        "Geolocation for emergency services",
        "Disaster database integration"
      ],
      tech: ["React.js", "Chart.js", "REST APIs", "Weather API", "Geolocation"],
      image: "/placeholder.jpg",
      github: "https://github.com/Murugesh1804/resqai",
      live: null,
      achievement: null,
      category: "Web App",
      icon: <Globe className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Smart Email Automation System",
      description: "An intelligent email automation system that categorizes placement emails and sends WhatsApp alerts via Twilio. Uses LLaMA-70B API to summarize long emails and prevent missed deadlines.",
      features: [
        "Automated email categorization",
        "WhatsApp alerts via Twilio",
        "LLaMA-70B API integration",
        "Email summarization",
        "Deadline tracking and alerts"
      ],
      tech: ["n8n", "Gmail API", "Google Sheets", "Twilio", "LLaMA-70B", "Automation"],
      image: "/placeholder.jpg",
      github: "https://github.com/Murugesh1804/n8n-email-automation",
      live: null,
      achievement: null,
      category: "Automation",
      icon: <Zap className="h-8 w-8 text-yellow-500" />
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI/ML":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "Web App":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      case "Automation":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  return (
    <section id="projects" className="section-padding bg-muted/30 py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-heading mb-4">
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-24 h-1 bg-gradient-to-r from-primary to-purple-400 rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Here are some of my key projects that showcase my skills in full-stack development, 
          machine learning, and automation. Each project represents a unique challenge and learning opportunity.
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group"
          >
            <Card className="hover-effect bg-secondary/50 border-none backdrop-blur-sm h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {project.icon}
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <Badge className={`mt-2 ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  {project.achievement && (
                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                      <Trophy className="h-3 w-3 mr-1" />
                      {project.achievement}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm text-primary uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm text-primary uppercase tracking-wide">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 group-hover:border-primary group-hover:text-primary transition-colors"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                  
                  {project.live && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group-hover:border-primary group-hover:text-primary transition-colors"
                      onClick={() => window.open(project.live, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        variants={itemVariants}
        className="text-center mt-16"
      >
        <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Interested in Collaborating?</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m always open to discussing new opportunities, interesting projects, 
              and innovative ideas. Let&apos;s create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="lightning-button">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button variant="outline" onClick={() => window.open('https://github.com/Murugesh1804', '_blank')}>
                <Github className="mr-2 h-4 w-4" />
                View More on GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

