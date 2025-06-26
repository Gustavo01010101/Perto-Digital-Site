document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de âncora com tratamento de erro
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Fechar menu mobile se estiver aberto
                const navList = document.querySelector('.nav-list');
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Toggle para o menu mobile com verificação de elementos
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = navList.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());
            
            // Adiciona tecla ESC para fechar o menu
            if (isExpanded) {
                document.addEventListener('keydown', closeMenuOnEsc);
            } else {
                document.removeEventListener('keydown', closeMenuOnEsc);
            }
        });
        
        function closeMenuOnEsc(e) {
            if (e.key === 'Escape') {
                navList.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.removeEventListener('keydown', closeMenuOnEsc);
            }
        }
    }

    // Funcionalidades de Acessibilidade
    const body = document.body;
    const toggleContrastBtn = document.getElementById('toggle-contrast');
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const resetFontBtn = document.getElementById('reset-font');
    
    // Tamanho de fonte base (padrão 16px)
    const baseFontSize = 16;
    let currentFontSize = parseFloat(getComputedStyle(body).fontSize);
    
    // Função para ajustar o tamanho da fonte com limites
    function adjustFontSize(change) {
        const newSize = currentFontSize + change;
        
        // Limites mínimo (12px) e máximo (24px)
        if (newSize >= 12 && newSize <= 24) {
            currentFontSize = newSize;
            body.style.fontSize = `${currentFontSize}px`;
            localStorage.setItem('accessibility-fontSize', currentFontSize);
        }
    }
    
    // Função para resetar o tamanho da fonte
    function resetFontSize() {
        currentFontSize = baseFontSize;
        body.style.fontSize = '';
        localStorage.removeItem('accessibility-fontSize');
    }

    // Toggle Contraste com verificação de elemento
    if (toggleContrastBtn) {
        toggleContrastBtn.addEventListener('click', function() {
            body.classList.toggle('high-contrast');
            const isHighContrast = body.classList.contains('high-contrast');
            
            // Salvar preferência
            if (isHighContrast) {
                localStorage.setItem('accessibility-contrast', 'high');
            } else {
                localStorage.removeItem('accessibility-contrast');
            }
            
            // Atualizar ARIA
            toggleContrastBtn.setAttribute('aria-pressed', isHighContrast.toString());
            toggleContrastBtn.querySelector('i').className = isHighContrast ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Carregar preferência de contraste
        if (localStorage.getItem('accessibility-contrast') === 'high') {
            body.classList.add('high-contrast');
            toggleContrastBtn.setAttribute('aria-pressed', 'true');
            toggleContrastBtn.querySelector('i').className = 'fas fa-sun';
        }
    }

    // Controles de tamanho de fonte com verificação de elementos
    if (increaseFontBtn) {
        increaseFontBtn.addEventListener('click', function() {
            adjustFontSize(1); // Aumenta em 1px
        });
    }

    if (decreaseFontBtn) {
        decreaseFontBtn.addEventListener('click', function() {
            adjustFontSize(-1); // Diminui em 1px
        });
    }
    
    if (resetFontBtn) {
        resetFontBtn.addEventListener('click', resetFontSize);
    }

    // Carregar tamanho de fonte salvo
    const savedFontSize = localStorage.getItem('accessibility-fontSize');
    if (savedFontSize) {
        currentFontSize = parseFloat(savedFontSize);
        body.style.fontSize = `${currentFontSize}px`;
    }

    // Intérprete de Libras (integração futura)
    const toggleLibrasBtn = document.getElementById('toggle-libras');
    if (toggleLibrasBtn) {
        toggleLibrasBtn.addEventListener('click', function() {
            // Implementação real viria aqui
            console.log('Intérprete de Libras seria ativado aqui');
        });
    }

    // Validação de formulário básica
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simulação de envio
            console.log('Formulário enviado:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
});