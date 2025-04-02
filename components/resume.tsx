"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Briefcase, GraduationCap, Award } from "lucide-react"

export default function Resume() {
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

  const education = [
    {
      degree: "B.Tech Information Technology",
      institution: "SRMIST",
      location: "Chennai",
      period: "2022 - 2026 (Expected)",
      description: "CGPA: 9.39 | Till 5th Semester",
    },
    {
      degree: "HSC",
      institution: "ST. PAUL'S MHSS",
      location: "Neyveli",
      period: "2020 - 2022",
      description: "Grade: 85.5",
    },
    {
      degree: "SSLC",
      institution: "ST. PAUL'S MHSS",
      location: "Neyveli",
      period: "2018 - 2020",
      description: "Grade: 86.2",
    },
  ]

  const experience = [
    {
      position: "Back-End Developer",
      company: "TECHOBITE",
      location: "Remote",
      period: "Dec 2024 - Present",
      description: [
        "Developed RESTful APIs and server-side logic using Node.js and Express.js",
        "Implemented MongoDB database solutions with efficient indexing and query optimization",
        "Built authentication and authorization systems for secure user access",
        "Documented API endpoints for improved team collaboration and integration",
      ],
    },
    {
      position: "Full-Stack Developer",
      company: "GLOBAL INFO TECHNOLOGIES",
      location: "Remote",
      period: "Oct 2024 - Dec 2024",
      description: [
        "Built responsive web applications using React.js with reusable component architecture",
        "Collaborated with UI/UX designers to translate wireframes into interactive web interfaces",
        "Implemented Git workflow for version control and collaborative development",
      ],
    },
    {
      position: "Front-End Engineer",
      company: "SKYSCANNER",
      location: "Remote",
      period: "Jan 2024",
      description: [
        "Developed a responsive travel date picker UI using Backpack React Library",
        "Implemented pixel-perfect designs following company design system",
        "Created accessible UI components following WCAG guidelines",
      ],
    },
  ]

  const certifications = [
    {
      title: "React Basics",
      issuer: "Meta",
      date: "2023",
    },
    {
      title: "Introduction to Front-End Development",
      issuer: "Meta",
      date: "2023",
    },
    {
      title: "Introduction to MongoDB",
      issuer: "MongoDB",
      date: "2023",
    },
  ]

  return (
    <section id="resume" className="section-padding bg-muted/30 py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold font-heading mb-2">
          My <span className="text-gradient">Resume</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
          A summary of my education, work experience, and qualifications.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-6">
          <Button size="lg" className="lightning-button animate-pulse">
            <Download className="mr-2 h-4 w-4" /> Download CV
          </Button>
        </motion.div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <div className="flex items-center mb-6">
            <GraduationCap className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-2xl font-bold">Education</h3>
          </div>

          <div className="space-y-6">
            {education.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover-effect bg-secondary/50 border-none">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold">{item.degree}</h4>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-primary">
                      {item.institution}, {item.location}
                    </p>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <div className="flex items-center mb-6">
            <Briefcase className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-2xl font-bold">Experience</h3>
          </div>

          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover-effect bg-secondary/50 border-none">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold">{item.position}</h4>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-primary">
                      {item.company}, {item.location}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {item.description.map((desc, i) => (
                        <li key={i} className="text-muted-foreground text-sm">
                          • {desc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-10"
      >
        <div className="flex items-center mb-6">
          <Award className="h-6 w-6 text-primary mr-3" />
          <h3 className="text-2xl font-bold">Certifications & Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover-effect bg-secondary/50 border-none h-full">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-2">{cert.title}</h4>
                  <p className="text-primary">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">{cert.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <Card className="hover-effect bg-secondary/50 border-none h-full">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold mb-2">PECHACK 2.0</h4>
                <p className="text-primary">Hackathon Achievement</p>
                <p className="text-sm text-muted-foreground">Achieved Top 10 placement (out of 800 teams)</p>
                <p className="text-sm text-muted-foreground">Built MediPlus: Hospital Management Platform</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover-effect bg-secondary/50 border-none h-full">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold mb-2">HACK THE HORIZON (2024)</h4>
                <p className="text-primary">Hackathon Achievement</p>
                <p className="text-sm text-muted-foreground">
                  Developed ResqAI, an AI-driven disaster prediction tool with interactive UI
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

