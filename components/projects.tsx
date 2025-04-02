"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  })
  const [activeTab, setActiveTab] = useState("all")

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
      id: 1,
      title: "MediPlus",
      description:
        "Hospital Management Platform with responsive front-end interfaces using React.js and Material-UI. Implemented blockchain technology for secure data storage and sharing.",
      image: "/placeholder.svg?height=400&width=600",
      category: "full-stack",
      technologies: ["React.js", "Material-UI", "Node.js", "MongoDB", "Blockchain"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 2,
      title: "ResqAI",
      description:
        "Emergency Companion with interactive UI for emergency resource access. Integrated multiple third-party APIs for real-time weather and disaster data.",
      image: "/placeholder.svg?height=400&width=600",
      category: "frontend",
      technologies: ["React.js", "Tailwind CSS", "API Integration", "Data Visualization"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 3,
      title: "Travel Date Picker",
      description:
        "Responsive travel date picker UI using Backpack React Library. Implemented pixel-perfect designs following company design system.",
      image: "/placeholder.svg?height=400&width=600",
      category: "frontend",
      technologies: ["React.js", "Backpack UI", "WCAG Guidelines"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 4,
      title: "E-Commerce API",
      description:
        "RESTful API for e-commerce platform with authentication, product management, and order processing endpoints.",
      image: "/placeholder.svg?height=400&width=600",
      category: "backend",
      technologies: ["Node.js", "Express.js", "MongoDB", "JWT Authentication"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
  ]

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  const tabs = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "full-stack", label: "Full Stack" },
  ]

  return (
    <section id="projects" className="section-padding py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold font-heading mb-2">
          My <span className="text-gradient">Projects</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
          A collection of my recent work showcasing my skills and experience in web development.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex justify-center mb-10"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              variants={itemVariants}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="group" whileHover={{ y: -5 }}>
            <Card className="overflow-hidden border-none bg-secondary/50 h-full">
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-end space-x-2">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

