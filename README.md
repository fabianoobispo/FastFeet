<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>


<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, por isso é fundamental que ele seja feito com muito empenho!</p>

<p>Começando a primeira etapa dia 29/01 de quatro partes. </p>



### Instalando Dependências
```sh
git clone ...
cd FastFeet
yarn
```

### Subindo o banco
```sh
mkdir db
docker run -it -p 5432:5432 postgres
```

### Rodando migração e criando usuário Admin
```sh
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

### Subindo a aplicação
```sh
yarn dev
```

### Rotas
| Resource | Method | Params (JSON) | Headers |
| :---     | :---:  |    :---:      |    ---: |
| /session       | POST | {email, password} | |
| /recipient     | POST | {nome, rua, numero, complemento, estado, cep} | JWT |
| /recipient/:id | PUT  | {nome, rua, numero, complemento, estado, cep} | JWT |
