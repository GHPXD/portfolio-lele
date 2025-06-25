// Função para filtrar projetos
function filterProjects(category) {
    currentFilter = category;
    
    // Atualiza a classe 'active' no botão clicado
    const buttons = document.querySelectorAll('.projects-filter .filter-btn');
    buttons.forEach(btn => {
        // Remove a classe de todos os botões
        btn.classList.remove('active');
        // Adiciona a classe apenas ao botão correspondente
        if (btn.getAttribute('onclick') === `filterProjects('${category}')`) {
            btn.classList.add('active');
        }
    });
    
    // Chama a função renderGrid para redesenhar os projetos com o filtro aplicado
    // A função renderGrid agora lê a variável global 'currentFilter'
    renderGrid();
}

// Função para filtrar certificados (mantida como estava)
function filterCertificates(tech) {
    currentCertificateFilter = tech;
    
    // Atualizar botões ativos
    const buttons = document.querySelectorAll('.certificates-filter .filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tech === 'all') {
        filteredCertificates = Object.keys(certificatesData);
    } else {
        filteredCertificates = Object.keys(certificatesData).filter(
            certificateName => certificatesData[certificateName].category === tech
        );
    }
    
    currentCertificateIndex = 0;
    renderCertificatesCarousel();
    startCertificateAutoplay();
}
 
// Função de rolagem suave (mantida)
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de entrada de seções (mantida)
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-out');
    fadeInObserver.observe(section);
});