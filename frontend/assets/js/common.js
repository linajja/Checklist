const url = 'http://localhost:5001'
const mainInput = document.querySelector('#new-todo')
const addButton = document.querySelector('#add-new-todo')
const messageDiv = document.querySelector('.messages')

const messages = (message, status) => {
    let klase = (status === 'success') ? 'alert-success' : 'alert-danger'
    messageDiv.innerHTML = message
    messageDiv.classList.remove('alert-success', 'alert-danger')
    messageDiv.classList.add('show', klase)

    setTimeout(() => {
        messageDiv.classList.remove('show')
<<<<<<< HEAD
    }, 10000)
}

const transferData = async (url, method = 'GET', data = {}) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (method != 'GET')
        options.body = JSON.stringify(data)
    const resp = await fetch(url, options)
    return resp.json()
=======
    }, 8000)
>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f
}

const getData = () => {

    transferData(url)
        .then(resp => {
            if (resp.status === 'success') {
                let html = '<ul>'

                resp.data.forEach(value => {
                    let done = value.done ? 'done' : ''

                    html += `<li data-id="${value.id}">
                            <input type="checkbox" class="mass-delete" />
                            <a class="mark-done ${done}">${value.task}</a>
                            <a class="btn btn-danger delete-todo">Trinti</a>
                            <a class="btn btn-primary update-todo">Redaguoti</a>
<<<<<<< HEAD
                           
=======
>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f
                        </li>`
                })

                html += '</ul>'

                document.querySelector('#todos').innerHTML = html

                document.querySelectorAll('.mark-done').forEach(element => {
                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

                        transferData(url + '/mark-done/' + id, 'PUT')
                            .then(resp => {
                                if (resp.status === 'success') {
                                    getData()
                                }
                                messages(resp.message, resp.status)
                            })

                    })
                })

                document.querySelectorAll('.delete-todo').forEach(element => {
                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

                        transferData(url + '/delete-todo/' + id, 'DELETE')
                            .then(resp => {
                                if (resp.status === 'success') {
                                    getData()
                                }
                                messages(resp.message, resp.status)
                            })

                    })
                })

                document.querySelectorAll('.update-todo').forEach(element => {
                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

<<<<<<< HEAD
                        transferData(url + '/' + id)
=======
                        fetch(url + '/' + id)
                            .then(resp => resp.json())
>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f
                            .then(resp => {
                                if (resp.status === 'success') {
                                    mainInput.value = resp.data.task
                                    mainInput.classList.add('edit-mode')
                                    mainInput.setAttribute('data-mode', 'edit')
                                    addButton.textContent = addButton.getAttribute('data-edit-label')
                                    addButton.setAttribute('data-id', id)
                                } else {
                                    messages(resp.message, resp.status)
                                }
                            })

                    })
                })

            } else {
                let messages = document.querySelector('.messages')

                messages.innerHTML = resp.message
                messages.classList.add('show')
            }
        })

}

window.addEventListener('load', () => {
    getData()
})

<<<<<<< HEAD

=======
>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f
addButton.addEventListener('click', () => {
    let task = mainInput.value
    let mode = mainInput.getAttribute('data-mode')
    let route = url + '/add-todo'
    let method = 'POST'

    if (task === '') {
        let messages = document.querySelector('.messages')
        messages.innerHTML = 'Įveskite užduotį'
        messages.classList.add('show')
        return
    }

    if (mode === 'edit') {
        let id = addButton.getAttribute('data-id')
        route = url + '/edit-todo/' + id
        method = 'PUT'
    }

<<<<<<< HEAD
    transferData(route, method, { task })
=======
    fetch(route, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
        .then(resp => resp.json())
>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f
        .then(resp => {
            if (resp.status === 'success') {
                getData()
            }

            mainInput.value = ''
            mainInput.classList.remove('edit-mode')
            addButton.textContent = addButton.getAttribute('data-add-label')

            messages(resp.message, resp.status)
        })
})

document.querySelector('#mass-delete').addEventListener('click', () => {

    let ids = []

    document.querySelectorAll('.mass-delete:checked').forEach(element => {
        ids.push(element.parentElement.getAttribute('data-id'))
    })

<<<<<<< HEAD
    transferData(url + '/mass-delete', 'DELETE', { ids })
=======
    fetch(url + '/mass-delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
    })
        .then(resp => resp.json())
>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f
        .then(resp => {
            if (resp.status === 'success') {
                getData()
            }
<<<<<<< HEAD
=======

>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f
            messages(resp.message, resp.status)
        })

})