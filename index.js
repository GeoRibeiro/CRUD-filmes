import express from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

app.get("/todos-filmes", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_GeovannaRibeiro"

    sql.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.post("/adicionar-filme", (request, response) => {
    const { nome_filme, genero, duracao_min, classificacao_indicativa } = request.body

    const insertCommand = "INSERT INTO filmes_GeovannaRibeiro (nome_filme, genero, duracao_min, classificacao_indicativa) VALUES (?, ?, ?, ?)"

    sql.query(insertCommand, [nome_filme, genero, duracao_min, classificacao_indicativa], (error) => {
        if (error){
            console.log(error)
            return
        }

        response.status(201).json({
            message: "Filme adicionado com sucesso!"
        })
    })
})

app.delete("/apagar-filme/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_GeovannaRibeiro WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if (error){
            console.log(error)
            return
        }

        response.json({
            message: "Filme apagado com sucesso!"
        })
    })
})


app.put("/atualizar-filme/:id", (request, response) => {
    const { id } = request.params
    const { nome_filme, genero, duracao_min, classificacao_indicativa } = request.body

    const updateCommand = "UPDATE filmes_GeovannaRibeiro SET nome_filme=?, genero=?, duracao_min=?, classificacao_indicativa=? WHERE id=?"

    sql.query(updateCommand, [nome_filme, genero, duracao_min, classificacao_indicativa, id], (error, result) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao atualizar filme" })
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ message: "Filme não encontrado!" })
        }

        response.json({
            message: "Filme atualizado com sucesso!"
        })
    })
})


app.listen(3019,() => {
    console.log("Funcionando ae")
})

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03TB"
})