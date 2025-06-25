// Lógica para renderizar a grade de projetos e o modal de estudo de caso

let currentFilter = 'all';
let filteredProjects = Object.keys(projectsData);

// Função para obter o ícone da ferramenta/tecnologia
function getTechIcon(tech) {
    const icons = {
        // Ferramentas de Design
        figma: 'fab fa-figma',
        adobexd: 'fas fa-pen-ruler',
        sketch: 'fas fa-layer-group',
        illustrator: 'fas fa-palette',
        photoshop: 'fas fa-image',
        aftereffects: 'fas fa-video',
        // Adicione outras tecnologias se necessário
    };
    return icons[tech] || 'fas fa-cog'; // Ícone padrão
}

// Função para criar o HTML de um card de projeto na grade
function createProjectCard(projectName, projectData) {
    const techIcons = projectData.tech.map(tech => 
        `<span class="tech-icon" title="${tech}">
            <i class="${getTechIcon(tech)}"></i>
        </span>`
    ).join('');

    return `
        <div class="project-card" data-project="${projectName}">
            <div class="project-image-container">
                <img src="${projectData.image}" alt="${projectName}" loading="lazy">
            </div>
            <div class="project-card-content">
                <p class="project-card-category">${projectData.category.replace('-', ' ')}</p>
                <h3 class="project-card-title">${projectName}</h3>
                <div class="project-card-tech">
                    ${techIcons}
                </div>
            </div>
        </div>
    `;
}

// Função para renderizar a grade de projetos
function renderGrid() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Filtra os projetos com base no filtro atual
    if (currentFilter === 'all') {
        filteredProjects = Object.keys(projectsData);
    } else {
        filteredProjects = Object.keys(projectsData).filter(
            p => projectsData[p].category === currentFilter
        );
    }
    
    if (filteredProjects.length === 0) {
        grid.innerHTML = '<p>Nenhum projeto encontrado nesta categoria.</p>';
        return;
    }

    grid.innerHTML = filteredProjects.map(projectName => 
        createProjectCard(projectName, projectsData[projectName])
    ).join('');

    // Adiciona os event listeners para abrir o modal
    addCardEventListeners();
}

// Função para adicionar listeners aos cards
function addCardEventListeners() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.dataset.project;
            openProjectModal(projectName, projectsData[projectName]);
        });
    });
}

// Função para abrir e popular o modal do estudo de caso
function openProjectModal(projectName, projectData) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    // Popula o cabeçalho do modal
    document.getElementById('projectModalImage').src = projectData.image;
    document.getElementById('projectModalTitle').textContent = projectName;
    
    const techIconsHTML = projectData.tech.map(tech => 
        `<span class="tech-icon" title="${tech}"><i class="${getTechIcon(tech)}"></i></span>`
    ).join('');
    document.getElementById('projectModalTech').innerHTML = techIconsHTML;
    
    // Popula o corpo do modal (estudo de caso)
    const caseStudy = projectData.caseStudy;
    document.getElementById('projectModalDescription').innerHTML = caseStudy.description;

    // Popula a galeria de imagens
    const galleryContainer = document.getElementById('projectModalImageGallery');
    galleryContainer.innerHTML = '<h3>Galeria do Projeto</h3>' + caseStudy.gallery.map(img_src => 
        `<img src="${img_src}" alt="Imagem da galeria do projeto ${projectName}" loading="lazy">`
    ).join('');
    
    // Popula os botões de links externos
    const buttonsContainer = document.getElementById('projectModalButtons');
    buttonsContainer.innerHTML = caseStudy.links.map(link => 
        `<a href="${link.url}" target="_blank" class="project-btn">
            <i class="fas fa-external-link-alt"></i> ${link.text}
        </a>`
    ).join('');

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Impede o scroll da página ao fundo
}

// Função para fechar o modal
function setupModalEventListeners() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const closeButton = modal.querySelector('.project-close');
    
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display !== 'none') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}


// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    setupModalEventListeners();
});