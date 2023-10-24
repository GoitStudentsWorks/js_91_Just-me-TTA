import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api';

const ref = {
    openModalBtn: document.querySelector('.openModalBtn'),
    addFavoriteButton: document.querySelector('.add-favorite'),
    giveRatingButton: document.querySelector('.give-rating'),
    exerciseList: document.querySelector('.exercise'),
    modal: document.getElementById('outerModal'),
    closeModalBtn: document.querySelector('.modal-x-button'),
    ratingValue: document.querySelector('.modal-rating-value'),
    modalExerciseName: document.querySelector('.exercise-list__title'),
    modalRatingValue: document.querySelector('.modal-rating-value'),
    modalTarget: document.querySelector('.start-target'),
    modalBodyPart: document.querySelector('.start-body'),
    modalEquipment: document.querySelector('.start-equipment'),
    modalPopularity: document.querySelector('.start-popular'),
    modalBurnedCalories: document.querySelector('.start-burned'),
    modalDescriptionText: document.querySelector('.modal-description-text'),
    modalGif: document.querySelector('.exercise-list__img'),
    modalTitle: document.querySelector('.exercise-list__title'),
    removeButton: document.querySelector(".remove-button"),
    giveRatingButton: document.querySelector(".give-rating"),
    buttonText: document.querySelector(".button-text"),
     ratingModal: document.getElementById('ratingModal'),
};

let favoritesData = [];
let isModalOpen = false;

const openButtons = document.querySelectorAll("[data-modal-open]");
openButtons.forEach((openModalBtnItem) => {
  openModalBtnItem.addEventListener("click", openExerciseModal);
});

ref.openModalBtn.addEventListener("click", openExerciseModal);
ref.closeModalBtn.addEventListener("click", closeExerciseModal);

function openExerciseModal(evt) {
    ref.modal.classList.add("is-open"); // Додайте клас is-open, щоб відкрити модальне вікно

    const exerciseId = evt.target.closest(".js-workout-card").dataset.id;
    checkLocalStorageForId(exerciseId);
}
function createRatingStars(rating) {
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');

    // Розрахунок кількості повних та напівзаповнених зірок
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.1 && rating % 1 <= 0.9;

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        if (i < fullStars) {
            star.classList.add('yellow-star');
        } else if (i === fullStars && hasHalfStar) {
            star.classList.add('half-filled-star');
        } else {
            star.classList.add('gray-star');
        }

        ratingContainer.appendChild(star);
    }

    return ratingContainer;
}

async function checkLocalStorageForId(id) {
  const response = await axios.get(`${BASE_URL}/exercises/${id}`);
    const exerciseData = response.data;
    
     

  // Створення та вставка рейтингу
  const rating = parseFloat(exerciseData.rating);
  const ratingStars = createRatingStars(rating);
  ref.modalRatingValue.innerHTML = ''; // Очистити попередній рейтинг
  ref.modalRatingValue.appendChild(ratingStars); // Додати новий рейтинг
  ref.modalTarget.textContent = exerciseData.target;
  ref.modalBodyPart.textContent = exerciseData.bodyPart;
  ref.modalEquipment.textContent = exerciseData.equipment;
  ref.modalPopularity.textContent = exerciseData.popularity;
  ref.modalBurnedCalories.textContent = `${exerciseData.burnedCalories}/3 min`;
  ref.modalDescriptionText.textContent = exerciseData.description;
  ref.modalGif.src = exerciseData.gifUrl;
  ref.modalTitle.textContent = exerciseData.name;
    
}


function closeExerciseModal() {
    ref.modal.classList.remove("is-open"); 
}
ref.addFavoriteButton.addEventListener("click", function() {
  if (ref.addFavoriteButton.textContent === "Add to favorites") {
    ref.addFavoriteButton.textContent = "Remove from favorites";
  } else {
    ref.addFavoriteButton.textContent = "Add to favorites";
  }
});


ref.giveRatingButton.addEventListener('click', function() {

    ref.modal.classList.remove('is-open');
    ref.ratingModal.classList.add('is-open');
});
