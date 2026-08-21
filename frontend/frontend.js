async function buscarFilmes() {
    const resposta = await fetch("http://localhost:3019/")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.nome_filme}</h2>
                <p><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Duração:</strong> ${filme.duracao_min} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classificacao_indicativa}</p>
            </div>
        `
    })
}

buscarFilmes()
