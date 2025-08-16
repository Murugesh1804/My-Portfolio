"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Sparkles, Code, Zap, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Particles from "@/components/particles"

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Floating animation for icons
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Staggered text animation
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  // Glow effect for the main title
  const glowVariants = {
    initial: { filter: "blur(0px)" },
    animate: {
      filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20"
      style={{ top: 100 }}
    >
      {/* Enhanced Particles */}
      <Particles className="absolute inset-0 z-0" quantity={150} />
      
      {/* Floating decorative elements */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-20 left-10 text-primary/20 z-10"
      >
        <Code size={24} />
      </motion.div>
      
      <motion.div
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: "1s" }}
        className="absolute top-32 right-20 text-primary/20 z-10"
      >
        <Zap size={20} />
      </motion.div>
      
      <motion.div
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-32 left-20 text-primary/20 z-10"
      >
        <Trophy size={18} />
      </motion.div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 z-10 relative"
      >
        <motion.div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="inline-flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  👋
                </motion.span>
                Hello, I&apos;m
              </span>
            </motion.p>
          </motion.div>

          {/* Main Title */}
          <motion.div
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.h1 
              ref={textRef} 
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-tight"
            >
              <motion.span 
                className="text-gradient relative"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              >
                Murugesh S
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Animated Role */}
          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div className="flex justify-center items-center">
              <h2 className="text-xl md:text-3xl font-medium text-muted-foreground relative">
                <motion.span
                  className="inline-block border-r-2 border-primary pr-2"
                  animate={{ borderColor: ["hsl(var(--primary))", "transparent"] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  Full-Stack Developer & ML Enthusiast
                </motion.span>
              </h2>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Final-year B.Tech Information Technology student at SRMIST with <strong className="text-primary">9.30 CGPA</strong>. 
              Passionate about building efficient, user-friendly applications and exploring data engineering concepts.
            </motion.p>
          </motion.div>

          {/* Achievement Badge */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Trophy className="h-5 w-5" />
              <span className="font-medium">1st Place - SIMATS Hackathon 2024</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={5}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button size="lg" className="lightning-button text-lg px-8 py-6">
                <Sparkles className="mr-2 h-5 w-5" />
                View My Work
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => {
                  const pdfUrl = "/Resume_Murugesh.pdf"
                  const link = document.createElement("a")
                  link.href = pdfUrl
                  link.setAttribute("download", "Murugesh_Resume.pdf")
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors group"
          whileHover={{ y: 5 }}
        >
          <motion.span 
            className="text-sm mb-3 font-medium tracking-wider uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />
    </section>
  )
}

