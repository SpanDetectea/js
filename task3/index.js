let initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const text = document.querySelector('.review__text')
const btn = document.querySelector('.review__btn')
const select = document.querySelector('.review__select')
const wrapper = document.querySelector('.review__wrapper')

btn.addEventListener('click', submit)
let numbersId = [];
initialData.map(item => {
    const newItem = item.reviews.map(review => +review.id)
    console.log(newItem)
    numbersId.push(...newItem)
    return newItem
})
let id = Math.max(...numbersId)


function loadProducts() {
    initialData.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.product;
        select.appendChild(option);
    });
    loadReviews(0);
}

function loadReviews(index) {
    wrapper.innerHTML = ""
    initialData[index].reviews.forEach(review => {
        const reviewBoxEl = document.createElement('div')
        reviewBoxEl.classList.add('review__wrapper__elements')
        reviewBoxEl.textContent = review.text
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Удалить'
        deleteButton.addEventListener('click', e =>deleteReview(index, review.id))
        reviewBoxEl.appendChild(deleteButton)
        wrapper.appendChild(reviewBoxEl)
    })
}
function deleteReview(product, id) {
    const newData = initialData[product].reviews.filter(review => {
       return  review.id != id
    })
    console.log(newData)
    initialData[product].reviews = newData
    localStorage.clear();
    localStorage.setItem('database', JSON.stringify(initialData))
    loadReviews(product)
}

function submit() {
    const textInput = text.value;
    const indexProduct = select.value
    if (textInput.length < 50 || textInput.length > 500) {
        throw new Error("Отзыв должен содержать от 50 до 500 символов.");
    }
    const newReview = {
        id: id,
        text: textInput,
    }
    initialData[indexProduct].reviews.push(newReview)
    localStorage.setItem('database', JSON.stringify(initialData))
    loadReviews(indexProduct)
    text.value = ""
    id++;
}
select.addEventListener('change', e => loadReviews(e.target.value))

loadProducts()