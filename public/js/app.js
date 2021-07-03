console.log('Client side javascript is loaded');

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location);
//             console.log(data.forecast)
//         }
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    message1.textContent = 'Loading';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message1.textContent = '';
            message2.textContent = data.error;
        } else {
            message1.textContent = 'Result:';
            message2.textContent = data.location + '. ' + data.forecast
        }
        search.value = '';
    })
});
})