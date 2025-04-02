import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Resume from "@/components/resume"
import Skills from "@/components/skills"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import CustomCursor from "@/components/custom-cursor"

export const metadata: Metadata = {
  title: "Murugesh S | Web Developer",
  description: "Full-Stack Developer specializing in React.js, Node.js, and modern web technologies",
}

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Testimonials />
      <Contact />
    </main>
  )
}

