"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
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

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Import and use the email service
      const { getEmailService } = await import('@/lib/email-service')
      const emailService = getEmailService()
      
      const result = await emailService.sendEmail(data)
      
      if (result.success) {
        setSubmitStatus('success')
        toast.success("Message sent successfully! I'll get back to you soon.")
        reset()
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
      
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus('error')
      toast.error("Failed to send message. Please try again.")
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "dhanamurugesh1804@gmail.com",
      link: "mailto:dhanamurugesh1804@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "+91 9345544982",
      link: "tel:+919345544982",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "Chennai, India",
      link: "https://maps.google.com/?q=Chennai,India",
    },
  ]

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      link: "https://github.com/Murugesh1804",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      link: "https://www.linkedin.com/in/murugesh-s/",
      label: "LinkedIn",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      link: "https://murugesh.dev",
      label: "Portfolio",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      link: "mailto:dhanamurugesh1804@gmail.com",
      label: "Email",
    },
  ]

  return (
    <section id="contact" className="section-padding bg-muted/30 py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-heading mb-4">
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="w-24 h-1 bg-gradient-to-r from-primary to-purple-400 rounded-full mx-auto mb-6"></motion.div>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Ready to start a conversation? I'd love to hear from you about your next project, 
          collaboration opportunities, or just to say hello!
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {/* Contact Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:col-span-1"
        >
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover-effect bg-secondary/50 border-none backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <a 
                          href={item.link} 
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 break-words"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <Card className="hover-effect bg-secondary/50 border-none backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-muted p-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                        aria-label={social.label}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:col-span-2"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-secondary/50 border-none backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="John Doe"
                        className={`bg-muted/50 border-muted focus:border-primary transition-all duration-300 ${
                          errors.name ? "border-red-500 focus:border-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Your Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className={`bg-muted/50 border-muted focus:border-primary transition-all duration-300 ${
                          errors.email ? "border-red-500 focus:border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="How can I help you?"
                      className={`bg-muted/50 border-muted focus:border-primary transition-all duration-300 ${
                        errors.subject ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell me about your project, questions, or anything else you'd like to discuss..."
                      className={`min-h-[150px] bg-muted/50 border-muted focus:border-primary transition-all duration-300 resize-none ${
                        errors.message ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting || !isValid}
                    className="w-full lightning-button text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 inline mr-2" />
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 inline mr-2" />
                      Oops! Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

