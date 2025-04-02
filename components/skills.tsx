"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Server, Database, Layers } from "lucide-react"

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

  const skills = [
    {
      category: "Frontend",
      icon: <Code className="h-6 w-6 text-primary" />,
      skills: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "JavaScript (ES6+)", level: 85 },
        { name: "React.js", level: 80 },
        { name: "Responsive Design", level: 85 },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 80 },
        { name: "RESTful APIs", level: 85 },
      ],
    },
    {
      category: "Database",
      icon: <Database className="h-6 w-6 text-primary" />,
      skills: [{ name: "MongoDB", level: 75 }],
    },
    {
      category: "Development Tools",
      icon: <Layers className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Git", level: 80 },
        { name: "GitHub", level: 85 },
        { name: "Figma", level: 70 },
        { name: "Chrome DevTools", level: 80 },
        { name: "npm", level: 75 },
      ],
    },
  ]

  return (
    <section id="skills" className="section-padding bg-muted/30 py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold font-heading mb-2">
          My <span className="text-gradient">Skills</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
          A showcase of my technical abilities and expertise in various web development technologies and tools.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {skills.map((skillGroup, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="hover-effect bg-secondary/50 border-none h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  {skillGroup.icon}
                  <h3 className="text-xl font-bold ml-3">{skillGroup.category}</h3>
                </div>
                <div className="space-y-4">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: isInView ? `${skill.level}%` : 0 }}
                          transition={{ duration: 1.5, delay: 0.2 + skillIndex * 0.1 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="hover-effect text-center bg-secondary/50 border-none h-full">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">3+</div>
              <p className="text-muted-foreground">Years of Experience</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover-effect text-center bg-secondary/50 border-none h-full">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover-effect text-center bg-secondary/50 border-none h-full">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <p className="text-muted-foreground">Internships</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover-effect text-center bg-secondary/50 border-none h-full">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">2</div>
              <p className="text-muted-foreground">Hackathon Awards</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

