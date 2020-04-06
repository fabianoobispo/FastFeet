<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/LogoFastFeetGoStack.png" width="300px" />
</h1>

<h3 align="center">
  Desafio  FastFeet
</h3>

### :rocket: Sobre a aplicação

Esta é uma aplicação construída para uma transportadora fictícia, a FastFeet, usando Node, React, React Native.

- **API:** NodeJs usando banco de dados PostgreSQL, mongo e redis. Com autenticação JWt 
- **WEB:** React usando redux, yup para verificação de dados, e compoonents estilizados.
- **MOBILE:** React Native...

### :bookmark_tabs: **Funcionalidades de administrador**

- **Autenticação:** se autenticar no sistema para exercer restritas a usuarios autenticados.
- **Gestão de destinatários:** cadastrar, atualizar e listar destinatários cadastrados.
- **Gestão de entregadores:** cadastrar, atualizar e listar entregadores cadastrados.
- **Gestão de encomendas:** cadastrar, atualizar, listar e cancelar encomendas cadastradas.

Toda vez que uma encomenda é cadastrado para um entregador, o mesmo recebe um alerta no seu email com as informações, assim como acontece no cancelamento de uma entrega.

### :bookmark_tabs: **Funcionalidades do entregador**

- **Visualizar encomendas:** informando o seu ID de cadastro, o entregador consegue visualizar todas suas encomendas.
- **Alterar status de encomendas:** o entregador pode definir uma data de retirada e de entrega para a encomenda, durante o periodo de 8:00 às 18:00 horas.
- **Cadastrar problemas nas entregas:** o entregador pode cadastrar problemas que ocorreram durante a entrega. Assim os problemas ficam registrados e o administrador pode decidir se a entrega deve ser cancelada ou não.

### :bookmark_tabs: **Rotas**
As rotas estão disponiveis pra consulta no arquivo <a href="https://github.com/fabianoobispo/FastFeet/blob/master/backend/Insomnia_export.json" target="_blank" alt="Rotas">Insomnia.json</a>

### Instalando Dependências backend
```sh
cd FastFeet/backend
copiar dados do arquivo .env.example para .env
yarn
```

### Subindo os bancos postgres e redis via docker 
```sh
docker run --name postgresfastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres:11

docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine

```
 

### Rodando migração e criando usuário Admin
antes da migrate temos que criar um databese com o nome fastfeet dentro do banco postgres
```sh
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

### Subindo a aplicação
```sh
yarn dev
```
### Subindo a fila de jobs para envio de emails
```sh
yarn queue
```


### Instalando Dependências Fontend
```sh
cd FastFeet/web
yarn
```

### Iniciando a aplicação web
```sh
yarn start
```
 



### Instalando Dependências Mobile
```sh
cd FastFeet/app
copiar dados do arquivo .env.example para .env
yarn
```

### Iniciando a aplicação web
```sh
react-native run-android
```
 

