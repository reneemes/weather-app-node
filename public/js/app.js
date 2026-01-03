console.log('Client side JS file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherResults = document.querySelector('.weather-results');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  const unit = document.querySelector('input[name="unit"]:checked').value;

  weatherResults.style.display = 'block';
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${location}&unit=${unit}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      weatherResults.style.display = 'block';
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
});
})