// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger menu
      const spans = navToggle.querySelectorAll("span")
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        const spans = navToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("active")
        const spans = navToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }
})

// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const formSuccess = document.getElementById("form-success")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Basic validation
      if (!data.name || !data.email || !data.interests || !data.message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      // In a real implementation, you would send this data to your server
      console.log("Form submitted with data:", data)

      // Show success message
      contactForm.style.display = "none"
      formSuccess.style.display = "block"

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: "smooth" })

      // In a real implementation, you might want to:
      // - Send data to your server/email service
      // - Add to a mailing list
      // - Store in a database
      // - Send confirmation email
    })
  }
})

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Add scroll effect to header
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(10px)"
      } else {
        header.style.background = "#fff"
        header.style.backdropFilter = "none"
      }
    })
  }
})

// Intersection Observer for fade-in animations
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements that should fade in
  const fadeElements = document.querySelectorAll(".feature-card, .option-card, .team-member, .vision-item")

  fadeElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Form field enhancements
document.addEventListener("DOMContentLoaded", () => {
  // Auto-resize textarea
  const textareas = document.querySelectorAll("textarea")
  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      this.style.height = "auto"
      this.style.height = this.scrollHeight + "px"
    })
  })

  // Add floating labels effect
  const formGroups = document.querySelectorAll(".form-group")
  formGroups.forEach((group) => {
    const input = group.querySelector("input, select, textarea")
    const label = group.querySelector("label")

    if (input && label && input.type !== "checkbox") {
      input.addEventListener("focus", () => {
        label.style.color = "#2d5a27"
      })

      input.addEventListener("blur", () => {
        label.style.color = "#333"
      })
    }
  })
})

// Accessibility enhancements
document.addEventListener("DOMContentLoaded", () => {
  // Skip to main content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2d5a27;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px"
  })

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add main id to main element
  const main = document.querySelector("main")
  if (main) {
    main.id = "main"
  }

  // Announce page changes for screen readers
  const pageTitle = document.title
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `
  announcement.textContent = `Page loaded: ${pageTitle}`
  document.body.appendChild(announcement)
})

// Performance optimization: Lazy load images
document.addEventListener("DOMContentLoaded", () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
          }
          observer.unobserve(img)
        }
      })
    })

    const lazyImages = document.querySelectorAll("img[data-src]")
    lazyImages.forEach((img) => imageObserver.observe(img))
  }
})
