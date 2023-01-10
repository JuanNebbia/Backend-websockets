const socket = io()

const form = document.getElementById('add-realtimeproducts-form')

form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(form)
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'manual'
    }

    fetch('http://localhost:8080/realtimeproducts',requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))
})

socket.on('newProduct', data => {
    console.log(data);
})