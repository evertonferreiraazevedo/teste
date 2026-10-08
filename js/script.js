// ===== Dados: edite à vontade para criar novas dicas =====
const dicas = [
    {
        emoji: "🏷️",
        titulo: "Dê nomes claros",
        texto: "Variáveis e funções devem dizer o que fazem. Seu eu do futuro agradece.",
        categoria: "Boas práticas",
        codigo: `// Ruim
let x = 18;

// Bom
let idadeMinima = 18;`
    },
    {
        emoji: "🧩",
        titulo: "Funções pequenas",
        texto: "Cada função deve fazer apenas uma coisa. Fica mais fácil de testar e reutilizar.",
        categoria: "Boas práticas",
        codigo: `function calcularTotal(preco, qtd) {
  return preco * qtd;
}`
    },
    {
        emoji: "💬",
        titulo: "Comente o porquê",
        texto: "O código mostra o que acontece. Comentários devem explicar o motivo das decisões.",
        categoria: "Boas práticas",
        codigo: `// Usamos setTimeout para aguardar a animação terminar
setTimeout(fechar, 300);`
    },
    {
        emoji: "🎨",
        titulo: "Use variáveis no CSS",
        texto: "Defina cores e medidas uma vez só e reaproveite em todo o projeto.",
        categoria: "CSS",
        codigo: `:root {
  --cor-principal: #6c8cff;
}
button {
  background: var(--cor-principal);
}`
    },
    {
        emoji: "📐",
        titulo: "Flexbox para alinhar",
        texto: "Com três linhas você centraliza qualquer coisa na tela.",
        categoria: "CSS",
        codigo: `.centro {
  display: flex;
  justify-content: center;
  align-items: center;
}`
    },
    {
        emoji: "🧱",
        titulo: "HTML semântico",
        texto: "Prefira header, nav, main e footer no lugar de dezenas de divs. Ajuda na acessibilidade e no SEO.",
        categoria: "HTML",
        codigo: `<main>
  <article>
    <h1>Título</h1>
  </article>
</main>`
    },
    {
        emoji: "🔒",
        titulo: "const por padrão",
        texto: "Use const sempre que possível e let apenas quando o valor precisar mudar. Evite var.",
        categoria: "JavaScript",
        codigo: `const nome = "Ana";
let contador = 0;
contador++;`
    },
    {
        emoji: "🪲",
        titulo: "Depure com console.log",
        texto: "Não adivinhe o valor de uma variável: mostre ele no console e descubra o bug.",
        categoria: "JavaScript",
        codigo: `console.log("valor:", valor);
console.table(listaDeAlunos);`
    },
    {
        emoji: "📚",
        titulo: "Aprenda lendo erros",
        texto: "A mensagem de erro quase sempre diz a linha e o motivo. Leia com calma antes de buscar ajuda.",
        categoria: "Mentalidade",
        codigo: null
    },
    {
        emoji: "🔁",
        titulo: "Pratique todo dia",
        texto: "Vinte minutos por dia valem mais do que sete horas no fim de semana.",
        categoria: "Mentalidade",
        codigo: null
    },
    {
        emoji: "🌿",
        titulo: "Commits pequenos",
        texto: "Salve seu progresso com frequência e escreva mensagens que expliquem a mudança.",
        categoria: "Git",
        codigo: `git add .
git commit -m "Adiciona menu responsivo"`
    },
    {
        emoji: "🤝",
        titulo: "Peça ajuda do jeito certo",
        texto: "Explique o que você queria, o que aconteceu e o que já tentou. Quem ajuda agradece.",
        categoria: "Mentalidade",
        codigo: null
    }
];

// ===== Elementos =====
const grid = document.getElementById("grid");
const filtros = document.getElementById("filtros");
const btnRandom = document.getElementById("btn-random");
const randomBox = document.getElementById("random-box");
const btnTema = document.getElementById("tema");

// ===== Renderizar cards =====
function renderizar(lista) {
    grid.innerHTML = "";

    lista.forEach((d) => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
      <div class="emoji">${d.emoji}</div>
      <h3>${d.titulo}</h3>
      <p>${d.texto}</p>
      <span class="badge">${d.categoria}</span>
    `;

        if (d.codigo) {
            const wrap = document.createElement("div");
            wrap.className = "code-wrap";

            const pre = document.createElement("pre");
            pre.textContent = d.codigo; // textContent evita interpretar HTML

            const btn = document.createElement("button");
            btn.className = "copy";
            btn.textContent = "Copiar";
            btn.addEventListener("click", () => copiar(d.codigo, btn));

            wrap.append(pre, btn);
            card.appendChild(wrap);
        }

        grid.appendChild(card);
        observer.observe(card);
    });
}

// ===== Animação ao rolar a página =====
const observer = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visivel");
                observer.unobserve(e.target);
            }
        });
    },
    { threshold: 0.15 }
);

// ===== Filtros por categoria =====
function criarFiltros() {
    const categorias = ["Todas", ...new Set(dicas.map((d) => d.categoria))];

    categorias.forEach((cat, i) => {
        const b = document.createElement("button");
        b.className = "filtro" + (i === 0 ? " ativo" : "");
        b.textContent = cat;

        b.addEventListener("click", () => {
            document.querySelectorAll(".filtro").forEach((f) => f.classList.remove("ativo"));
            b.classList.add("ativo");
            const filtradas = cat === "Todas" ? dicas : dicas.filter((d) => d.categoria === cat);
            renderizar(filtradas);
        });

        filtros.appendChild(b);
    });
}

// ===== Copiar código =====
async function copiar(texto, botao) {
    try {
        await navigator.clipboard.writeText(texto);
        botao.textContent = "Copiado ✓";
    } catch {
        botao.textContent = "Erro";
    }
    setTimeout(() => (botao.textContent = "Copiar"), 1500);
}

// ===== Dica aleatória =====
btnRandom.addEventListener("click", () => {
    const d = dicas[Math.floor(Math.random() * dicas.length)];
    randomBox.innerHTML = `<strong>${d.emoji} ${d.titulo}</strong><br />${d.texto}`;
});

// ===== Tema claro/escuro =====
function aplicarTema(tema) {
    if (tema === "claro") {
        document.documentElement.setAttribute("data-tema", "claro");
        btnTema.textContent = "☀️";
    } else {
        document.documentElement.removeAttribute("data-tema");
        btnTema.textContent = "🌙";
    }
}

let temaAtual = localStorage.getItem("tema") || "escuro";
aplicarTema(temaAtual);

btnTema.addEventListener("click", () => {
    temaAtual = temaAtual === "escuro" ? "claro" : "escuro";
    localStorage.setItem("tema", temaAtual);
    aplicarTema(temaAtual);
});

// ===== Início =====
criarFiltros();
renderizar(dicas);