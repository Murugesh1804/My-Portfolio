"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const { theme } = useTheme()

  const particles = useRef<Array<Particle>>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const mouseIsMoving = useRef<boolean>(false)
  const animationFrame = useRef<number | null>(null)

  const resizeObserver = useRef<ResizeObserver | null>(null)

  class Particle {
    x: number
    y: number
    size: number
    originalX: number
    originalY: number
    vx: number
    vy: number
    color: string
    opacity: number
    pulsePhase: number
    connectionDistance: number

    constructor(x: number, y: number, size: number, color: string) {
      this.x = x
      this.y = y
      this.size = size
      this.originalX = x
      this.originalY = y
      this.vx = 0
      this.vy = 0
      this.color = color
      this.opacity = Math.random() * 0.5 + 0.3
      this.pulsePhase = Math.random() * Math.PI * 2
      this.connectionDistance = Math.random() * 100 + 50
    }

    update() {
      const dx = mouse.current.x - this.x
      const dy = mouse.current.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance
      const maxDistance = 120
      const force = (maxDistance - distance) / maxDistance
      const directionX = forceDirectionX * force * staticity
      const directionY = forceDirectionY * force * staticity

      if (distance < maxDistance && mouseIsMoving.current) {
        this.vx -= directionX
        this.vy -= directionY
      } else {
        if (this.x !== this.originalX) {
          const dx = this.x - this.originalX
          this.vx = -dx / ease
        }
        if (this.y !== this.originalY) {
          const dy = this.y - this.originalY
          this.vy = -dy / ease
        }
      }

      // Add subtle floating movement
      this.pulsePhase += 0.02
      const floatX = Math.sin(this.pulsePhase) * 0.5
      const floatY = Math.cos(this.pulsePhase * 0.7) * 0.5

      this.x += this.vx + floatX
      this.y += this.vy + floatY

      // Damping
      this.vx *= 0.95
      this.vy *= 0.95
    }

    draw() {
      if (!context.current) return
      
      // Create gradient for each particle
      const gradient = context.current.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      )
      
      const baseColor = this.color
      const alpha = this.opacity * (0.8 + 0.2 * Math.sin(this.pulsePhase))
      
      gradient.addColorStop(0, baseColor.replace('0.3', alpha.toString()))
      gradient.addColorStop(1, baseColor.replace('0.3', '0'))
      
      context.current.beginPath()
      context.current.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      context.current.fillStyle = gradient
      context.current.fill()
    }
  }

  const drawConnections = () => {
    if (!context.current) return

    context.current.strokeStyle = theme === "dark" 
      ? "rgba(147, 51, 234, 0.1)" 
      : "rgba(147, 51, 234, 0.05)"
    context.current.lineWidth = 1

    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const dx = particles.current[i].x - particles.current[j].x
        const dy = particles.current[i].y - particles.current[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const opacity = (100 - distance) / 100
          context.current.strokeStyle = theme === "dark"
            ? `rgba(147, 51, 234, ${opacity * 0.1})`
            : `rgba(147, 51, 234, ${opacity * 0.05})`
          
          context.current.beginPath()
          context.current.moveTo(particles.current[i].x, particles.current[i].y)
          context.current.lineTo(particles.current[j].x, particles.current[j].y)
          context.current.stroke()
        }
      }
    }
  }

  const init = () => {
    if (!canvasRef.current) return

    context.current = canvasRef.current.getContext("2d")

    if (!context.current || !canvasContainerRef.current) return

    const container = canvasContainerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    canvasRef.current.width = containerWidth
    canvasRef.current.height = containerHeight

    // Enhanced color scheme based on theme
    const particleColors = theme === "dark" 
      ? [
          "rgba(147, 51, 234, 0.3)", // Purple
          "rgba(59, 130, 246, 0.3)", // Blue
          "rgba(16, 185, 129, 0.3)", // Green
          "rgba(245, 158, 11, 0.3)", // Yellow
          "rgba(239, 68, 68, 0.3)",  // Red
          "rgba(168, 85, 247, 0.3)", // Violet
          "rgba(236, 72, 153, 0.3)", // Pink
        ]
      : [
          "rgba(147, 51, 234, 0.2)", // Purple
          "rgba(59, 130, 246, 0.2)", // Blue
          "rgba(16, 185, 129, 0.2)", // Green
          "rgba(245, 158, 11, 0.2)", // Yellow
          "rgba(239, 68, 68, 0.2)",  // Red
          "rgba(168, 85, 247, 0.2)", // Violet
          "rgba(236, 72, 153, 0.2)", // Pink
        ]

    particles.current = []

    for (let i = 0; i < quantity; i++) {
      const size = Math.random() * 3 + 1
      const x = Math.random() * containerWidth
      const y = Math.random() * containerHeight
      const color = particleColors[Math.floor(Math.random() * particleColors.length)]
      particles.current.push(new Particle(x, y, size, color))
    }
  }

  const animate = () => {
    if (!context.current || !canvasRef.current) return

    // Clear with fade effect
    context.current.fillStyle = 'rgba(0, 0, 0, 0.05)'
    context.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Draw connections first
    drawConnections()

    // Then draw particles
    particles.current.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    animationFrame.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasContainerRef.current) return

    const rect = canvasContainerRef.current.getBoundingClientRect()
    mouse.current.x = e.clientX - rect.left
    mouse.current.y = e.clientY - rect.top
    mouseIsMoving.current = true

    setTimeout(() => {
      mouseIsMoving.current = false
    }, 150)
  }

  useEffect(() => {
    init()
    animate()

    window.addEventListener("mousemove", handleMouseMove)

    resizeObserver.current = new ResizeObserver(init)
    if (canvasContainerRef.current) {
      resizeObserver.current.observe(canvasContainerRef.current)
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      if (resizeObserver.current && canvasContainerRef.current) {
        resizeObserver.current.unobserve(canvasContainerRef.current)
      }
    }
  }, [theme, refresh])

  return (
    <div ref={canvasContainerRef} className={`particles-container ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

