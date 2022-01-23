# REST API com Node.JS, Express e SQLite3

Para rodar a API localmente execute os seguintes passos

## Passo 1

- Dependências

	```bash
	pip install faker
	```
	Isso irá instalar uma lib usado no script auxiliar que gera um mock da base de dados. Agora, instale as dependências do projeto:

	```bash
	npm install
	```

	Em seguida, execute o script que gera o mock da base dados:

	```bash
	python build_mock_db.py
	```

- Build
	Para buildar o projeto, é necessário ter o Docker instalado. Após a instalação, basta executar o seguinte script para gerar uma imagem:

	```bash
	npm run build
	```

	Para rodar a imagem localmente, na porta 49999:

	```bash
	npm run docker-image
	```

- Rodando o programa:
	Com as dependências instaladas e build gerado, pode-se agora testar os endpoints.

	No repositório há uma coleção do Postman como referência dos recursos desse projeto, mas alguns que podem ser testados de imediato são:

	```bash
	curl -XGET http://localhost:49999/movies
	```
	Para retornar todos os filmes cadastrados na base.

	```bash
	curl -XGET http://localhost:49999/movies/{id_do_filme}
	```
	Para retornar um filme por id.
