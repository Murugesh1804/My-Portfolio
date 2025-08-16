"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Briefcase, Trophy, Award, Code, Database, Brain, Globe } from "lucide-react"

export default function About() {
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

  const experience = [
    {
      title: "Backend Developer Intern",
      company: "Techobite",
      period: "Jan 2025 – Present",
      description: "Building REST APIs with Node.js & Express, redesigning company website with secure admin panel, collaborating with frontend team for API integration, documenting APIs for easier onboarding.",
      tech: ["Node.js", "Express", "REST APIs", "Git", "Admin Panel"],
      link: "https://acquiescent.in"
    },
    {
      title: "Full-Stack Developer Intern",
      company: "Global Info Technologies",
      period: "Oct 2024 – Dec 2024",
      description: "Built responsive web apps using React.js, introduced Git workflows for team collaboration, joined client meetings for requirements gathering, followed SDLC principles.",
      tech: ["React.js", "Git", "SDLC", "Client Communication"]
    }
  ]

  const achievements = [
    {
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      title: "1st Place Winner",
      subtitle: "SIMATS Hackathon 2024",
      description: "Built PredictIt crop yield prediction platform with 98% accuracy. Presented to industry judges & agricultural experts.",
      badge: "🏆 Winner"
    },
    {
      icon: <Award className="h-6 w-6 text-blue-500" />,
      title: "Academic Excellence",
      subtitle: "SRMIST",
      description: "Maintaining 9.30 CGPA in B.Tech Information Technology program with strong foundations in core subjects.",
      badge: "📚 9.30 CGPA"
    }
  ]

  const certifications = [
    {
      name: "React Basics",
      issuer: "Meta (Coursera)",
      date: "Oct 2024",
      icon: <Code className="h-5 w-5" />
    },
    {
      name: "Intro to Front-End Development",
      issuer: "Meta (Coursera)",
      date: "Sep 2024",
      icon: <Code className="h-5 w-5" />
    },
    {
      name: "Intro to MongoDB",
      issuer: "MongoDB University",
      date: "Nov 2024",
      icon: <Database className="h-5 w-5" />
    }
  ]

  return (
    <section id="about" className="section-padding bg-muted/30 py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-heading mb-4">
          About <span className="text-gradient">Me</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-24 h-1 bg-gradient-to-r from-primary to-purple-400 rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
          I&apos;m a final-year B.Tech Information Technology student at SRMIST with a passion for building efficient, 
          user-friendly applications and exploring data engineering concepts. With strong foundations in Python, JavaScript, 
          Data Structures, and DBMS, I&apos;ve developed impactful projects and gained valuable internship experience.
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Left Column - Experience & Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Experience Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="hover-effect bg-secondary/50 border-none backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{exp.title}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {exp.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {exp.link && (
                      <a 
                        href={exp.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                      >
                        View Company Website →
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              Achievements & Recognition
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover-effect bg-secondary/50 border-none backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg">{achievement.title}</h4>
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            {achievement.badge}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mb-2">{achievement.subtitle}</p>
                        <p className="text-muted-foreground leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Education & Certifications */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Education Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education
            </h3>
            <Card className="hover-effect bg-secondary/50 border-none backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-xl">B.Tech Information Technology</h4>
                    <p className="text-primary font-medium">SRM Institute of Science and Technology</p>
                    <p className="text-muted-foreground">Final Year Student</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    9.30 CGPA
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Strong foundations in Python, JavaScript, Data Structures, and DBMS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Hands-on experience in full-stack development and machine learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Exploring data engineering concepts and real-world applications</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover-effect bg-secondary/50 border-none backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                        {cert.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">{cert.name}</h4>
                        <p className="text-primary text-sm">{cert.issuer}</p>
                        <p className="text-muted-foreground text-sm">{cert.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              Additional Information
            </h3>
            <Card className="hover-effect bg-secondary/50 border-none backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-2">Languages</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">Tamil (Native)</Badge>
                      <Badge variant="outline">English (Fluent)</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Data Engineering</Badge>
                      <Badge variant="outline">Cloud Technologies</Badge>
                      <Badge variant="outline">AI/ML</Badge>
                      <Badge variant="outline">Continuous Learning</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

