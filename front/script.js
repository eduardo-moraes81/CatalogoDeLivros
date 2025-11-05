const API_URL = "/api/livros";
const form = document.getElementById("formLivro");
const tabela = document.querySelector("#tabelaLivros tbody");
const limparBtn = document.getElementById("limpar");

async function carregarLivros() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        tabela.innerHTML = '<tr><td colspan="5">Erro ao carregar livros</td></tr>';
        return;
    }
    const livros = await res.json();
    tabela.innerHTML = "";
    livros.forEach(livro => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${livro.id}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano}</td>
            <td>
                <button class="edit" data-id="${livro.id}">✏️</button>
                <button class="delete" data-id="${livro.id}">🗑️</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const livro = {
        id: id ? parseInt(id) : 0,
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        ano: parseInt(document.getElementById("ano").value)
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
    }

    form.reset();
    carregarLivros();
});

limparBtn.addEventListener("click", () => {
    form.reset();
});

tabela.addEventListener("click", async (e) => {
    if (e.target.matches(".delete")) {
        const id = e.target.dataset.id;
        if (confirm("Deseja realmente excluir este livro?")) {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            carregarLivros();
        }
    } else if (e.target.matches(".edit")) {
        const id = e.target.dataset.id;
        const res = await fetch(`${API_URL}/${id}`);
        if (res.ok) {
            const livro = await res.json();
            document.getElementById("id").value = livro.id;
            document.getElementById("titulo").value = livro.titulo;
            document.getElementById("autor").value = livro.autor;
            document.getElementById("ano").value = livro.ano;
        } else {
            alert("Livro não encontrado");
        }
    }
});

carregarLivros();
