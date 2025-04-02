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

    constructor(x: number, y: number, size: number, color: string) {
      this.x = x
      this.y = y
      this.size = size
      this.originalX = x
      this.originalY = y
      this.vx = 0
      this.vy = 0
      this.color = color
    }

    update() {
      const dx = mouse.current.x - this.x
      const dy = mouse.current.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance
      const maxDistance = 100
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

      this.x += this.vx
      this.y += this.vy
    }

    draw() {
      if (!context.current) return
      context.current.beginPath()
      context.current.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      context.current.fillStyle = this.color
      context.current.fill()
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

    const particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"

    particles.current = []

    for (let i = 0; i < quantity; i++) {
      const size = Math.random() * 2 + 1
      const x = Math.random() * containerWidth
      const y = Math.random() * containerHeight
      particles.current.push(new Particle(x, y, size, particleColor))
    }
  }

  const animate = () => {
    if (!context.current || !canvasRef.current) return

    context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

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
    }, 100)
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

