const musicCollection = {
    albums: [
        {
            title: "first",
            artist: "a",
            year: "1"
        },
        {
            title: "second",
            artist: "b",
            year: "2"
        },
        {
            title: "random",
            artist: "c",
            year: "3"
        }
    ],
    [Symbol.iterator]: function () {
        let index = 0;
        let albums = this.albums;

        return {
            next: function () {
                return {
                    value: albums[index++],
                    done: index > albums.length
                };
            }
        };
    }
}

for (let album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}

//task 2

const dishes = new Map();

dishes.set('Пицца "Маргарита"', 'Виктор')
    .set('Пицца "Пепперони"', 'Виктор')
    .set('Суши "Калифорния"', 'Ольга')
    .set('Суши "Филадельфия"', 'Ольга')
    .set('Тирамису', 'Дмитрий')
    .set('Чизкейк', 'Дмитрий')

const alexey = { name: "Алексей" };
const maria = { name: "Мария" };
const irina = { name: "Ирина" };

const orders = new Map();
orders.set(alexey, ['Пицца "Пепперони"', 'Тирамису'])
    .set(maria, ['Суши "Калифорния"', 'Пицца "Маргарита"'])
    .set(irina, ['Чизкейк']);
function displayOrders() {
    orders.forEach((dishesList, client) => {
        console.log(`${client.name} заказал:`);
        dishesList.forEach(dish => {
            console.log(`  - ${dish} (повар: ${dishes.get(dish)})`);
        });
    });
}

displayOrders();