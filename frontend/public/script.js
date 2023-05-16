

async function fetchingData(url) {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result)
    return result;
}

async function displayPizzas() {
    const pizzaData = await fetchingData("http://localhost:3000/api/pizza");

    let text = "";

    pizzaData.pizzas.forEach(pizza => {
        text += `<div class="pizza" id="${'pizza:' + pizza.id}">
        <div class="pizza-name" >
        <h2>${pizza.name}</h2>
        </div>
        <div class="allergens" id="${pizza.allergens}"></div>
        <img src=${pizza.img}>
        <div class="ingedients">
        <p>${pizza.ingedients}</p>
        </div>
        <div class="price">
        <p>${pizza.price}zł</p>
        </div>
        </div>
        `
    });
    return text;
}


async function displayAllergents() {
    const allergenData = await fetchingData("http://localhost:3000/api/allergen");

    let text = "";

    allergenData.allergens.forEach(allergen => {
        text += `<h3>${allergen.name}</h3>
        <input type="checkbox" class="allergen-input" id="${'allergen:' + allergen.id}">`
    })
    return text;
}

function load() {

    const pizzasForm = document.getElementById("pizzas")
    const allergentsForm = document.getElementById('allergents')

    displayPizzas().then(response => {
        pizzasForm.insertAdjacentHTML("beforeend", response);
    }).catch(error => {
        console.error(error);
    })

    displayAllergents().then(response => {
        allergentsForm.insertAdjacentHTML("beforeend", response);
    }).catch(error => {
        console.error(error);
    })


    const checkboxElements = document.querySelectorAll(".allergen-input")
    const pizzaElements = document.querySelectorAll(".pizza")
    const allergenElements = document.querySelectorAll(".allergens")

    window.addEventListener("change", function (event) {
        checkboxElements.forEach(checkbox => {
            pizzaElements.forEach(pizza => {
                allergenElements.forEach(allergen => {
                    if (checkbox.checked === true && allergen.id.includes(checkbox.id.split(":")[1])) {
                        console.log("git");
                        pizza.remove();
                    }
                })
            })
        })
    })
}

window.addEventListener("load", load);