document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleção dos elementos do DOM
    const container = document.querySelector('.carrossel-container');
    const banners = document.querySelectorAll('.aviso-item');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const dots = document.querySelectorAll('.dot');
    const wrapper = document.querySelector('.carrossel-wrapper');

    if (!container || banners.length === 0) return;

    let indiceAtual = 0;
    const totalBanners = banners.length;
    let tempoTrocaAuto = null;

    // Tempo de transição: 10000ms = 10 segundos
    const TEMPO_EXIBICAO = 10000; 

    // 2. Atualiza a posição do carrossel e o estado das bolinhas
    function atualizarCarrossel() {
        container.style.transform = `translateX(-${indiceAtual * 100}%)`;

        dots.forEach((dot, index) => {
            if (index === indiceAtual) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 3. Funções para avançar e voltar
    function proximoBanner() {
        indiceAtual++;
        if (indiceAtual >= totalBanners) {
            indiceAtual = 0;
        }
        atualizarCarrossel();
    }

    function bannerAnterior() {
        indiceAtual--;
        if (indiceAtual < 0) {
            indiceAtual = totalBanners - 1;
        }
        atualizarCarrossel();
    }

    // 4. Cliques nos botões de navegação
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            proximoBanner();
            reiniciarTimer();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            bannerAnterior();
            reiniciarTimer();
        });
    }

    // 5. Clique direto nas bolinhas
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            indiceAtual = index;
            atualizarCarrossel();
            reiniciarTimer();
        });
    });

    // 6. Controle do temporizador de 10s
    function iniciarTrocaAutomatica() {
        tempoTrocaAuto = setInterval(proximoBanner, TEMPO_EXIBICAO);
    }

    function pararTrocaAutomatica() {
        clearInterval(tempoTrocaAuto);
    }

    function reiniciarTimer() {
        pararTrocaAutomatica();
        iniciarTrocaAutomatica();
    }

    // Pausa o carrossel se o usuário estiver com o cursor em cima da imagem
    if (wrapper) {
        wrapper.addEventListener('mouseenter', pararTrocaAutomatica);
        wrapper.addEventListener('mouseleave', iniciarTrocaAutomatica);
    }

    // Inicia rotação automática
    iniciarTrocaAutomatica();
});