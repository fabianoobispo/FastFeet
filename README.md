<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="src/img/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio  FastFeet, o início
</h3>


<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, por isso é fundamental que ele seja feito com muito empenho!</p>

<p>Começando a primeira etapa dia 29/01 e treminada 05/03 de quatro partes. </p>

<p>Começando a segunda etapa dia / e treminada / de quatro partes. </p>

<p>Começando a terceira etapa dia / e treminada / de quatro partes. </p>

<p>Começando a quarta etapa dia / e treminada / de quatro partes. </p>


### Instalando Dependências
```sh
git clone ...
cd FastFeet
yarn
```

### Subindo o banco
```sh
mkdir db
docker run --name postgresfast -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
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

### Com autenticação JWT

### Realizando as devidas validaçôes


### Rotas
post /sessions para iniciar uma sessao com email e senha 

post /recipients para adicionar novo destinatario com nome  e endereço completo 

get /recipients:id para mostar o cadasto do id indicado 

put /recipients:id para atualizar o cadastro selecionado 



