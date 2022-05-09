# README

# Rodando os projetos separados
* Clonar o repositório ```https://github.com/MayconMarigo/desafio-lets-code.git```.

## Backend
* Da pasta ```root``` do projeto rode ```cd back```
* Rode o comando ```npm run server``` para iniciar o backend.

## Frontend
* Da pasta ```root``` do projeto rode ```cd front```
* Rode o comando ```npm start``` para iniciar o front.
* O navegador abrirá automaticamente na url ```http://localhost:3000``` onde a página estará disponível.

## Com Docker

* Clonar o repositório ```https://github.com/MayconMarigo/desafio-lets-code.git```.
* Rodar o comando no gitbash ```docker-compose up```
* Após a inicialização dos containers basta navegar para a url: ```http://localhost:3000``` que a página estará disponível.

# Funcionalidades - REQUISITOS FUNCIONAIS

## Adicionar tarefa
* Ao clicar no botão com o símbolo "+" no canto inferior direito da tela abrirá uma modal solicitando as informações para adicionar a nova tarefa.

BOTÃO:

![image](https://user-images.githubusercontent.com/67290959/167441290-f3ce2171-4543-4b65-ab4d-049fe917d47f.png)

MODAL:

![image](https://user-images.githubusercontent.com/67290959/167440603-67a2cbae-ff4d-4beb-b048-be10e387367f.png)

* É necessário preencher ambos os campos e então clicar no símbolo de confirmação no canto inferior direito da modal.

## Remover tarefa
* Ao passar o mouse em cima de qualquer card de tarefa será liberado no canto esquerdo inferior um botão com símbolo de uma lixeira, basta clicar para excluir a tarefa desejada.

CARD: 

![image](https://user-images.githubusercontent.com/67290959/167442875-a65938df-da45-4ce9-bf01-a18a46472c63.png)

* Se a exclusão for feita com sucesso será exibido uma mensagem de confirmação no canto superior direito da tela

MENSAGEM:

![image](https://user-images.githubusercontent.com/67290959/167441134-bf29eb8f-9a96-4685-80a0-033487691c3c.png)

## Atualizar Tarefa
* Ao passar o mouse em cima de qualquer card de tarefa será liberado no canto direito inferior um botão com símbolo de uma caneta, basta clicar para editar a tarefa desejada.

CARD:

![image](https://user-images.githubusercontent.com/67290959/167442569-81f27002-5d79-47a3-be6a-28b23c914316.png)

* O card entra em modo de edição e permite que os campos sejam alterados

CARD EDITÁVEL:

![image](https://user-images.githubusercontent.com/67290959/167443137-c7401b68-7461-4a08-9227-87d203353963.png)

* É necessário preencher ambos os campos e então clicar no símbolo de confirmação no canto inferior direito do card para gravar a alteração.

## Alterar status
* Poderá ser alterado o status de uma tarefa das seguintes formas:
    * de "To Do" para "Doing".
    * de "Doing" para "To Do" ou "Doing" para "Done"
    * de "Done" para "Doing"
* Para realizar a alteração basta clicar nos botões correspondentes em cada um dos cards conforme representação das setas abaixo:

![image](https://user-images.githubusercontent.com/67290959/167442205-b9877368-b8be-4414-a8f0-3d52daf02ad9.png)

# Funcionalidades - REQUISITOS NÃO FUNCIONAIS

## Cada uma das colunas poderá ser recolhida caso seja clicado em qualquer lugar do header da mesma:

COLUNA ABERTA (DEFAULT) : 

![image](https://user-images.githubusercontent.com/67290959/167444058-37468beb-e3a3-47f1-b3f8-44903b6e76c8.png)

COLUNA RECOLHIDA:

![image](https://user-images.githubusercontent.com/67290959/167444130-30d0c603-a560-4ba3-8528-6f06edfa70b5.png)

## Contador de tarefas

* Automaticamente ao adicionar, remover ou alterar o status de uma tarefa existe um contador para saber o número de tarefas em cada uma das colunas:

COLUNAS:

![image](https://user-images.githubusercontent.com/67290959/167444603-f89f1987-f317-4995-b8f4-0d18604b65a2.png)

## Markdown

* Ao adicionar ou alterar uma tarefa poderá ser utilizado padrões de markdown que serão disponibilizados dentro do card:

EXEMPLO MARKDOWN CÓDIGO JS:

![image](https://user-images.githubusercontent.com/67290959/167445449-ec68a6a3-2521-427e-ab13-a445d582af35.png)

adicionado escrevendo:

```
~~~js
setInterval(() => {console.log("oi lets code"}, 5000)
~~~
```

## Tecnologias

* React Js
    * MaterialUI / MaterialUI Icons
    * React Hooks
    * Context
* Node Js
    * Express

