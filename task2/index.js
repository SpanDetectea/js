class Library {
    #books

    constructor(initialBooks = []) {
        if (new Set(initialBooks).size !== initialBooks.length) {
            throw new Error("Начальный список книг содержит дубликаты.");
        }
        this.#books = [...initialBooks];
    }

    get allBooks() {
        return this.#books
    }
    addBook(title) {
        if (!this.#books[title]) {
            this.#books.push(title)
            return
        }
        throw new Error('Книга уже добавлена')
    }
    removeBook(title) {
        if (this.#books.includes(title)) {
            this.#books = [this.#books.filter(item => item != title)]
            return
        }
        throw new Error('Такой книги не существует')
    }
    hasBook(title) {
        return this.#books.includes(title)
    }
}

try {
    const myLibrary = new Library(["1984", "Гарри Поттер", "Властелин колец"]);
    console.log(myLibrary.allBooks);

    myLibrary.addBook("Дюна");
    console.log(myLibrary.allBooks);

    console.log(myLibrary.hasBook("Дюна"));
    myLibrary.removeBook("Дюна");
    console.log(myLibrary.allBooks);

    console.log(myLibrary.hasBook("Дюна"));
} catch (error) {
    console.error(error.message);
}
console.log('----------------')
// task 2

const initialData = [
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
        reviewBoxEl.textContent = review.text
        wrapper.appendChild(reviewBoxEl)
    })
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
    console.log(initialData[indexProduct])
    loadReviews(indexProduct)
    text.value = ""
}
select.addEventListener('change', e => loadReviews(e.target.value))

loadProducts()

// console.log(initialData[0].reviews[0].text.length)