"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  baseSize: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  pulse: number
  pulseSpeed: number
  glow: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 6), 200)

    // Define vibrant colors for particles
    const colors = [
      "hsla(262, 83%, 58%, 1)", // Purple (primary)
      "hsla(292, 83%, 58%, 1)", // Pink
      "hsla(232, 83%, 58%, 1)", // Blue
      "hsla(202, 83%, 58%, 1)", // Light Blue
      "hsla(180, 83%, 58%, 1)", // Teal
      "hsla(262, 83%, 78%, 1)", // Light Purple
    ]

    for (let i = 0; i < particleCount; i++) {
      const baseSize = Math.random() * 4 + 1.5
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseSize: baseSize,
        size: baseSize,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        glow: Math.random() * 10 + 5,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Update pulse
        particle.pulse += particle.pulseSpeed
        if (particle.pulse > Math.PI * 2) particle.pulse = 0

        // Pulsating size and opacity
        const pulseFactor = Math.sin(particle.pulse) * 0.5 + 0.5
        particle.size = particle.baseSize * (0.8 + pulseFactor * 0.6)
        const currentOpacity = particle.opacity * (0.8 + pulseFactor * 0.4)

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Extract color components for gradient
        const colorMatch = particle.color.match(/hsla?$$(\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?$$/)
        if (colorMatch) {
          const h = colorMatch[1]
          const s = colorMatch[2]
          const l = colorMatch[3]

          // Draw glow effect
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 2 + particle.glow,
          )
          gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${currentOpacity})`)
          gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`)

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2 + particle.glow, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          // Draw particle core
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${currentOpacity})`
          ctx.fill()
        }
      })

      // Draw connections
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.5

            // Extract color components for gradient
            const colorMatch1 = particles[i].color.match(/hsla?$$(\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?$$/)
            const colorMatch2 = particles[j].color.match(/hsla?$$(\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?$$/)

            if (colorMatch1 && colorMatch2) {
              const h1 = colorMatch1[1]
              const s1 = colorMatch1[2]
              const l1 = colorMatch1[3]

              const h2 = colorMatch2[1]
              const s2 = colorMatch2[2]
              const l2 = colorMatch2[3]

              // Create gradient line
              const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
              gradient.addColorStop(0, `hsla(${h1}, ${s1}%, ${l1}%, ${opacity})`)
              gradient.addColorStop(1, `hsla(${h2}, ${s2}%, ${l2}%, ${opacity})`)

              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = gradient
              ctx.stroke()
            }
          }
        }
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-100" style={{ pointerEvents: "none" }} />
}

