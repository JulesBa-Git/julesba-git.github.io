const themeToggle = document.getElementById('theme-toggle');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const body = document.body;
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('.section');
const sidebarLinks = sidebar.querySelectorAll('a');


function updateNavbarBackground() {
    let currentSection = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 20) {
            currentSection = section;
        }
    });

    if (currentSection) {
        navbar.style.backgroundColor = getComputedStyle(currentSection).backgroundColor;
    } else {
        navbar.style.backgroundColor = 'var(--navbar-bg)'; 
    }
}


function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.src = 'images/lightMode.png'; 
    } else {
        body.classList.remove('dark-theme');
        themeToggle.src = 'images/darkMode.png'; 
    }
    updateNavbarBackground(); 
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeToggle.src = 'images/lightMode.png'; 
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.src = 'images/darkMode.png'; 
        localStorage.setItem('theme', 'light');
    }
    updateNavbarBackground(); 
});


sidebarToggle.addEventListener('click', () => {
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none'; 
    } else {
        sidebar.style.display = 'block'; 
        updateNavbarBackground(); 
    }
});


function handleResize() {
    if (window.innerWidth > 768) { 
        sidebar.style.display = 'none'; 
    }
}

window.addEventListener('resize', handleResize);

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.style.display = 'none'; 
    });
});

window.addEventListener('scroll', updateNavbarBackground);

initializeTheme();

