const url = 'http://localhost:5001'

fetch(url)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.status === 'success') {
            let html = '<ul>'

            resp.data.forEach(value => {
                html += `<li>${value.task} <a data-id="${value.id}" class="btn btn-primary delete-todo">Trinti</a></li>`
            })

            html += '</ul>'

            document.querySelector('#todos').innerHTML = html

            document.querySelectorAll('.delete-todo').forEach(element => {
                let id = element.getAttribute('data-id')

                element.addEventListener('click', () => {

                    fetch(url + '/delete-todo/' + id, {
                        method: 'DELETE'
                    })
                        .then(resp => resp.json())
                        .then(resp => {
                            console.log(resp)
                        })

                })
            })

        } else {
            let messages = document.querySelector('.messages')

            messages.innerHTML = resp.message
            messages.classList.add('show')
        }
    })

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
            console.log(resp)
        })
})