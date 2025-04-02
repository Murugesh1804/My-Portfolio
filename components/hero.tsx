"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Particles from "@/components/particles"

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null)

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <Particles className="absolute inset-0 z-0" quantity={100} />

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-4"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1 ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6">
            <span className="text-gradient">Murugesh S</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <h2 className="text-xl md:text-2xl font-medium relative overflow-hidden whitespace-nowrap">
              <span className="animate-typing inline-block border-r-2 border-primary pr-1 animate-blink">
                Full-Stack Web Developer
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Building responsive, user-friendly web applications with modern JavaScript frameworks and libraries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="lightning-button">
              View My Work
            </Button>
            <Button size="lg" variant="outline" 
            onClick={() => {
                const pdfUrl = "/Resume_Murugesh.pdf"; 
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.setAttribute("download", "Murugesh_Resume.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);}}
            >
              Download CV
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2, duration: 0.5 }}
  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-0 flex justify-center"
>
  <a
    href="#about"
    className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
  >
    <span className="text-sm mb-2">Scroll Down</span>
    <ArrowDown className="animate-bounce" size={20} />
  </a>
</motion.div>

    </section>
  )
}

