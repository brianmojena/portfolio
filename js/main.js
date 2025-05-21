// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animación de apertura de cortina
    const curtain = document.querySelector('.curtain');
    curtain.classList.add('active');
    
    setTimeout(() => {
        curtain.classList.remove('active');
        // Iniciar animaciones de la intro después de que se abra la cortina
        animateIntro();
    }, 1000);
    
    // Animación de las letras del título
    function animateIntro() {
        const titleSpans = document.querySelectorAll('.animated-title span');
        const subtitle = document.querySelector('.subtitle');
        const startBtn = document.querySelector('.start-btn');
        const introSpotlight = document.querySelector('#intro .spotlight');
        
        // Mostrar el spotlight
        gsap.to(introSpotlight, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out'
        });
        
        // Animar cada letra del título
        gsap.to(titleSpans, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            onComplete: () => {
                // Animar el subtítulo después del título
                gsap.to(subtitle, {
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: 'power2.out'
                });
                
                // Animar el botón después del subtítulo
                gsap.to(startBtn, {
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    }
    
    // Animación de la foto de perfil flotante
    const profileAnimation = gsap.to('.profile-placeholder', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        paused: true
    });
    
    // Configurar las animaciones para cada sección al hacer scroll
    setupScrollAnimations();
    
    function setupScrollAnimations() {
        // Animación de la sección About
        ScrollTrigger.create({
            trigger: '#about',
            start: 'top center',
            onEnter: () => {
                const aboutSpotlight = document.querySelector('#about .spotlight');
                const aboutTexts = document.querySelectorAll('.about-text p');
                
                gsap.to(aboutSpotlight, {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
                
                gsap.to(aboutTexts, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power2.out'
                });
                
                // Iniciar animación flotante de la foto de perfil
                profileAnimation.play();
            },
            onLeaveBack: () => {
                // Pausar animación flotante al salir de la sección
                profileAnimation.pause();
            }
        });
        
        // Animación de la sección Projects
        ScrollTrigger.create({
            trigger: '#projects',
            start: 'top center',
            onEnter: () => {
                const projectsSpotlight = document.querySelector('#projects .spotlight');
                const projectCards = document.querySelectorAll('.project-card');
                
                gsap.to(projectsSpotlight, {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
                
                gsap.to(projectCards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        // Animación de la sección Philosophy
        ScrollTrigger.create({
            trigger: '#philosophy',
            start: 'top center',
            onEnter: () => {
                const philosophySpotlight = document.querySelector('#philosophy .spotlight');
                const manifestoTexts = document.querySelectorAll('.manifesto-text');
                
                gsap.to(philosophySpotlight, {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
                
                gsap.to(manifestoTexts, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        // Animación de la sección Contact
        ScrollTrigger.create({
            trigger: '#contact',
            start: 'top center',
            onEnter: () => {
                const contactSpotlight = document.querySelector('#contact .spotlight');
                const contactEmail = document.querySelector('.contact-email');
                const socialIcons = document.querySelectorAll('.social-icon');
                
                gsap.to(contactSpotlight, {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
                
                gsap.to(contactEmail, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                });
                
                gsap.to(socialIcons, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    delay: 0.3
                });
            }
        });
    }
    
    // Navegación suave al hacer clic en los enlaces del menú
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Botón de inicio del espectáculo
    const startBtn = document.querySelector('.start-btn');
    startBtn.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        
        window.scrollTo({
            top: aboutSection.offsetTop,
            behavior: 'smooth'
        });
    });
    
    // Navegación con teclado (flechas arriba y abajo)
    let currentSectionIndex = 0;
    const sections = document.querySelectorAll('.scene');
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Actualizar el índice de sección actual al hacer scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop - 200 && 
                scrollPosition < section.offsetTop + section.offsetHeight - 200) {
                currentSectionIndex = index;
            }
        });
    });
    
    // Microinteracciones para las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});