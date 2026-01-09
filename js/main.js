/*
  Données du portfolio
  Chaque projet est représenté par un objet
*/

const heroData = {
    intro: "Bonjour, je suis",
    name: "Kevin Neth",
    role: "AI Developer / MLOps engineer / Fullstack",
    description:
        "Développeur avec plus de 5 ans d’expérience, actuellement en transition vers l’intelligence artificielle et le MLOps, avec une solide base en développement logiciel et une montée en compétence active sur les technologies IA.",
}

const projects = [
    {
        id: 1,
        title: "Plateforme de gestion animale",
        context:
            "Digital Factory IBM — plateforme destinée aux vétérinaires et éleveurs.",
        features: "Gestion des animaux, alertes santé, interface multilingue.",
        technologies: ["React", "Next.js", "Redux", "Tailwind", "Jest"],
    },
    {
        id: 2,
        title: "Application SaaS de gestion du temps",
        context: "Application SaaS pour le sport et l’e-sport.",
        features:
            "Timers, agendas personnalisés, optimisation des performances.",
        technologies: ["React", "Next.js", "Redux", "Tailwind"],
    },
    {
        id: 3,
        title: "Application métier laboratoire",
        context: "Outil interne pour techniciens de laboratoire.",
        features: "Automatisation de tâches, intégration API, UX optimisée.",
        technologies: ["React", "HTML", "CSS", "Git"],
    },
]

const skillsData = [
    {
        category: "Frontend",
        items: [
            "React",
            "Next.js",
            "Vue.js",
            "Angular",
            "HTML5 / CSS3",
            "Tailwind CSS",
        ],
    },
    {
        category: "Langages",
        items: ["JavaScript", "TypeScript", "Python", "Golang", "C"],
    },
    {
        category: "Backend & Data",
        items: ["Node.js", "PostgreSQL", "MongoDB", "MySQL"],
    },
    {
        category: "DevOps & Outils",
        items: ["Git", "Docker", "Jira", "VS Code"],
    },
]

const aboutData = {
    paragraphs: [
        "Issu de l’école 42, j’ai commencé ma carrière par un stage chez IBM, avant d’y être recruté en tant que Frontend Developer pendant trois ans. J’y ai travaillé sur des projets à dimension internationale, au sein d’équipes agiles et pluridisciplinaires.",
        "J’ai ensuite poursuivi mon parcours en freelance, où j’ai participé au développement d’applications SaaS et à la création de Proofs of Concept pour différents clients.",
        "Aujourd’hui, je souhaite orienter ma carrière vers l’intelligence artificielle, avec un objectif à moyen terme de poste en ML Ops, afin de travailler sur des problématiques de data, de déploiement et d’industrialisation des modèles.",
    ],
    image: {
        src: "assets/images/ai_pic.jpg",
        alt: "Portrait de Kevin Neth",
    },
}

/*
  État du filtre de compétences
*/
let activeSkillFilter = "Tous"

const heroSection = document.getElementById("hero")

function renderHero(data) {
    heroSection.innerHTML = `
    <p class="hero-intro">${data.intro}</p>
    <h2 class="hero-title">${data.name}</h2>
    <p class="hero-role">${data.role}</p>
    <p class="hero-description">${data.description}</p>
  `
}

/*
  État temporaire du formulaire de contact
*/
let contactFormState = {
    name: "",
    email: "",
    message: "",
}

renderHero(heroData)

const projectsContainer = document.getElementById("projects-container")

function renderProjects(projectsList) {
    projectsContainer.innerHTML = ""

    projectsList.forEach((project) => {
        const article = document.createElement("article")
        article.classList.add("project-card")

        article.innerHTML = `
      <h3>${project.title}</h3>

      <p class="project-context">
        ${project.context}
      </p>

      <p class="project-features">
        ${project.features}
      </p>

      <p class="project-tech">
        ${project.technologies.join(" · ")}
      </p>
    `

        projectsContainer.appendChild(article)
    })
}

renderProjects(projects)

const skillsFiltersContainer = document.getElementById("skills-filters")

function renderSkillFilters(skills) {
    const categories = ["Tous", ...skills.map((skill) => skill.category)]

    skillsFiltersContainer.innerHTML = ""

    categories.forEach((category) => {
        const button = document.createElement("button")
        button.textContent = category

        if (category === activeSkillFilter) {
            button.classList.add("active")
        }

        button.addEventListener("click", () => {
            activeSkillFilter = category
            updateSkillsUI()
        })

        skillsFiltersContainer.appendChild(button)
    })
}

const skillsContainer = document.getElementById("skills-container")

function renderSkills(skills) {
    skillsContainer.innerHTML = ""

    const filteredSkills =
        activeSkillFilter === "Tous"
            ? skills
            : skills.filter((skill) => skill.category === activeSkillFilter)

    filteredSkills.forEach((skill) => {
        const article = document.createElement("article")
        article.classList.add("skill-card")

        article.innerHTML = `
      <h3>${skill.category}</h3>
      <ul>
        ${skill.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `

        skillsContainer.appendChild(article)
    })
}

function updateSkillsUI() {
    renderSkillFilters(skillsData)
    renderSkills(skillsData)
}

updateSkillsUI()

const aboutContainer = document.getElementById("about-content")

function renderAbout(data) {
    aboutContainer.innerHTML = `
    <div class="about-text">
      ${data.paragraphs.map((p) => `<p>${p}</p>`).join("")}
    </div>

    <div class="about-image">
      <img src="${data.image.src}" alt="${data.image.alt}" />
    </div>
  `
}

renderAbout(aboutData)

const contactForm = document.getElementById("contact-form")
const feedbackMessage = document.getElementById("form-feedback")

function validateContactForm(data) {
    if (!data.name || !data.email || !data.message) {
        return "Tous les champs sont requis."
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(data.email)) {
        return "Veuillez entrer une adresse email valide."
    }

    return null
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault()

    contactFormState.name = document.getElementById("name").value.trim()
    contactFormState.email = document.getElementById("email").value.trim()
    contactFormState.message = document.getElementById("message").value.trim()

    const error = validateContactForm(contactFormState)

    if (error) {
        feedbackMessage.textContent = error
        feedbackMessage.className = "error"
        return
    }

    feedbackMessage.textContent = "Votre message a bien été pris en compte."
    feedbackMessage.className = "success"

    contactForm.reset()
    contactFormState = { name: "", email: "", message: "" }
})
