const express = require('express'); // biblioteca de apis
const bodyParser = require('body-parser'); // biblioteca de receber dados na api
const { request, response } = require('express');

const app = express(); // cria um servidor

const PORT = 3001; // uma porta do seu computador que é usada para o servidor ?

app.use(bodyParser.json()); //

app.listen(PORT, () => console.log('Servidor funcionando'));

const books = [
    {
        name: 'O Mundo de Sofia',
        author: 'Jonstein Gaarden',
        id: 1
    },
    {
        name: '1984',
        author: 'George Orwell',
        id: 2
    },
    {
        name: 'Memórias Inventadas',
        author: 'Manoel de Barros',
        id: 3
    }
]

const listBooks = (request, response) => {    
    return response.status(200).send(books); // envia a lista de livros no postman
}

const createBook = (request, response) => {
    const book = request.body; // pede as informações do novo livro
    if(book.name && book.author && book.id){
        books.push(book);
        return response.status(201).send({ message: 'Livro cadastrado com sucesso!'}); 
    } else{
        return response.status(400).send({ message: 'Algumas das informações do livro não foram cadastrados corretamente!'}); 
    }
    
}

const deleteBook = (request, response) => {
    const id = request.params.id;
    let isFoundBook = false;
    if(books.length > 0){
        books.find((book, index) => {
            if(book.id == id){
                isFoundBook = true;
                books.splice(index, 1);
            }
        })
    }
    
    if(isFoundBook){
        return response.status(201).send({ message: 'Livro excluído com sucesso!'}); 
    } else{
        return response.status(400).send({ message: 'Livro não encontrado!'}); 
    }
}

const updateBook = (request, response) => {
    const id = request.params.id;
    if(id){
        response.status(201).send({ message : 'Livro atualizado com sucesso'});
    }else{
        return response.status(400).send ({ message : 'Falta enviar o id na URL!'});
    }
}

app.get('/book', listBooks);

app.post('/book', createBook);

app.delete('/book/:id', deleteBook); // passa o id pela url

app.put('/book/:id', updateBook);

// list books e create books são funcções callbacks que vão dentro do get, post, put, delete etc

// o request é pra solicitar informação do cliente
// o response é pra enviar algo ao cliente