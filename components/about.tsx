"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, Github, Linkedin } from "lucide-react"
import photo from "@/public/photo.jpg"

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
        staggerChildren: 0.2,
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

  return (
    <section id="about" className="section-padding py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        <motion.div variants={itemVariants} className="relative">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-105"></div>
            <div className="absolute inset-0 bg-muted rounded-2xl overflow-hidden">
              <Image
                src={photo}
                alt="Murugesh S"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-background p-4 rounded-lg shadow-lg">
              <div className="flex space-x-3">
                <a
                  href="https://github.com/Murugesh1804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/murugesh-s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a href="mailto:dhanamurugesh1804@gmail.com" className="hover:text-primary transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-3xl font-bold font-heading mb-2">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
            Detail-oriented Web Developer with hands-on experience building responsive, user-friendly web applications
            using modern JavaScript frameworks and libraries. Experienced in full-stack development with a focus on
            creating intuitive user interfaces and RESTful API integrations.
          </motion.p>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium mb-1">Name</h3>
                <p className="text-muted-foreground">Murugesh S</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-muted-foreground">dhanamurugesh1804@gmail.com</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-muted-foreground">+91 9345544982</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-muted-foreground">Chennai, India</p>
              </div>
            </div>
          </motion.div>

            <motion.div variants={itemVariants}>
            <Button
              className="lightning-button"
              size="lg"
              onClick={() => {
                const pdfUrl = "/Resume_Murugesh.pdf"; // Ensure the file is inside the public folder
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.setAttribute("download", "Murugesh_Resume.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
            </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      >
        <motion.div variants={itemVariants}>
          <Card className="hover-effect bg-secondary/50 border-none h-full">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-primary font-medium">B.Tech Information Technology</p>
              <p className="text-muted-foreground">SRMIST, Chennai</p>
              <p className="text-sm text-muted-foreground">Expected May 2026</p>
              <p className="mt-2">CGPA: 9.39</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover-effect bg-secondary/50 border-none h-full">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Experience</h3>
              <p className="text-primary font-medium">Back-End Developer</p>
              <p className="text-muted-foreground">TECHOBITE</p>
              <p className="text-sm text-muted-foreground">Dec 2024 - Present</p>
              <p className="mt-2">Developing RESTful APIs and server-side logic</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover-effect bg-secondary/50 border-none h-full">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Projects</h3>
              <p className="text-primary font-medium">MediPlus & ResqAI</p>
              <p className="text-muted-foreground">Hospital Management & Emergency Companion</p>
              <p className="text-sm text-muted-foreground">Featured Projects</p>
              <p className="mt-2">Responsive interfaces with React.js</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

