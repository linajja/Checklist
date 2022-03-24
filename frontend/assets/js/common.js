const url = 'http://localhost:5001'

const getData = () => {

    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            if (resp.status === 'success') {
                let html = '<ul>'

                resp.data.forEach(value => {
                    let done = value.done ? 'done' : ''
                    html += `<li data-id="${value.id}">
                    <input type="checkbox" class="mass-delete">
                    <a class ="mark-done ${done}">${value.task}</a>
                    <a class="btn btn-primary delete-todo">Trinti</a>
                    </li>`
                })

                html += '</ul>'

                document.querySelector('#todos').innerHTML = html

                document.querySelectorAll('.mark-done').forEach(element => {

                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

                        fetch(url + '/mark-done' + id, {
                            method: 'PUT'
                        })
                            .then(resp => resp.json())
                            .then(resp => {
                                if (resp.status === 'success') {
                                    getData()
                                }
                            })

                    })
                })

                document.querySelectorAll('.delete-todo').forEach(element => {
                    let id = element.parentElement.getAttribute('data-id')

                    element.addEventListener('click', () => {

                        fetch(url + '/delete-todo' + id, {
                            method: 'DELETE'
                        })
                            .then(resp => resp.json())
                            .then(resp => {
                                getData()
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

getData()

document.querySelector('#add-new-todo').addEventListener('click', () => {
    let task = document.querySelector('#new-todo').value

    if (task === '') {
        let messages = document.querySelector('.messages')
        messages.innerHTML = 'Įveskite užduotį'
        messages.classList.add('show')
        return
    }

    fetch(url + '/add-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task }),
    })
        .then(resp => resp.json())
        .then(resp => {
            getData()
        })
})


document.querySelector('#mass-delete').addEventListener('click', () => {

    let ids = []

    document.querySelectorAll('.mass-delete:checked').forEach(element => {
        ids.push(element.parentElement.getAttribute('data-id'))
    })


    fetch(url + '/mass-delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
    })
        .then(resp => resp.json())
        .then(resp => {

            getData()
        })
})