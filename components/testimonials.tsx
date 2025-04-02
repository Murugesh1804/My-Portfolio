"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  })
  const [activeIndex, setActiveIndex] = useState(0)

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

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Project Manager at TechoBite",
      image: "/placeholder.svg?height=100&width=100",
      text: "Murugesh is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are impressive. He's a valuable asset to any team.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Lead Developer at Global Info Technologies",
      image: "/placeholder.svg?height=100&width=100",
      text: "Working with Murugesh was a great experience. He quickly grasped complex requirements and implemented them efficiently. His code is clean, well-documented, and follows best practices.",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "UI/UX Designer",
      image: "/placeholder.svg?height=100&width=100",
      text: "Murugesh has an excellent eye for detail and a strong understanding of user experience. He translated my designs into pixel-perfect implementations and even suggested improvements that enhanced the final product.",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="section-padding py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold font-heading mb-2">
          Client <span className="text-gradient">Testimonials</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
          What people say about my work and collaboration experience.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-4xl mx-auto"
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="bg-secondary/50 border-none">
                  <CardContent className="p-8">
                    <Quote className="h-10 w-10 text-primary/30 mb-4" />
                    <p className="text-lg mb-6 italic">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-background rounded-full p-2 shadow-lg hover:bg-muted transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-background rounded-full p-2 shadow-lg hover:bg-muted transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? "bg-primary" : "bg-muted"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

