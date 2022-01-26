const request = require("supertest");
const app = require("./index");

describe("Testes API", () => {
  it("GET /movies --> retorna todos filmes", () => {
    return request(app)
      .get("/movies")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              nome_filme: expect.any(String),
              diretor: expect.any(String),
              genero: expect.any(String),
              em_cartaz: expect.any(Number),
              data_lancamento: expect.any(String),
              imagem_url: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /movies/id --> retorna filme por ID", () => {
    return request(app)
      .get("/movies/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          //TODO expects contendo informacoes de filme pre-definido na base
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              nome_filme: expect.any(String),
              diretor: expect.any(String),
              genero: expect.any(String),
              em_cartaz: expect.any(Number),
              data_lancamento: expect.any(String),
              imagem_url: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /movies/id --> retorna 404 filme nao encontrado", () => {
    //TODO criar expect do body
    return request(app)
      .get("/movies/999999")
      .expect(404)
      .then(expect.objectContaining("Filme nao encontrado"));
  });

  it("POST /movies --> salva um filme no banco de dados", () => {
    return request(app)
      .post("/movies")
      .send({
        nome_filme: "Drive",
        diretor: "Nicolas Winding Refn",
        genero: "Action Drama",
        em_cartaz: 0,
        data_lancamento: "20/05/2011",
        imagem_url: "url_teste",
      })
      .expect(201)
      .then(
        expect.objectContaining({
          id: expect.any(Number),
          nome_filme: "Drive",
          diretor: "Nicolas Winding Refn",
          genero: "Action Drama",
          em_cartaz: 0,
          data_lancamento: "20/05/2011",
          imagem_url: "url_teste",
        })
      );
  });

  it("PATCH /movies/id --> altera um filme no banco de dados", () => {
    return request(app)
      .patch("/movies/10")
      .send({
        nome_filme: "Drive",
        diretor: "Nicolas Winding Refn",
        genero: "Noir",
        em_cartaz: 0,
        data_lancamento: "20/05/2011",
        imagem_url: "url_teste",
      })
      .expect(200)
      .then(
        expect.objectContaining({
          id: 10,
          nome_filme: "Drive",
          diretor: "Nicolas Winding Refn",
          genero: "Noir",
          em_cartaz: false,
          data_lancamento: "20/05/2011",
          imagem_url: "url_teste",
        })
      );
  });

  it("DELETE /movies/id --> deleta um filme por id", async () => {
    //FIXME corrigir o teste pra torná-lo dinâmico
    var response = await request(app).post("/movies").send({
      nome_filme: "Drive",
      diretor: "Nicolas Winding Refn",
      genero: "Action Drama",
      em_cartaz: 0,
      data_lancamento: "20/05/2011",
      imagem_url: "url_teste",
    });
    uri = `/movies/${response.body.idFilme}`;
    return request(app).delete(uri).expect(204);
  });

  it("DELETE /movies/id --> tenta deletar filme não existente", () => {
    return request(app)
      .delete("/movies/999999")
      .expect(404)
      .then(
        expect.objectContaining({
          error: "Filme não encontrado",
        })
      );
  });
});
