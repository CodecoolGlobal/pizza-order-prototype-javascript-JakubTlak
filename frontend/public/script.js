

const order = {
    id: 0,
    pizzas: [],
    date: {
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
    },
    customer: {
        name: "",
        email: "",
        address: {
            city: "",
            street: ""
        }
    },
}
let customPizzaIngredients = [];
let customPizzaObject = {
    id: 8,
    name: "Custom pizza",
    ingredients: customPizzaIngredients,
    price: 64.99,
    img: "https://amrestcdn.azureedge.net/ph-web-ordering/Pizza_Hut_PL/NEW_WWW/314x314/PIZZA/PH_314x314_margherita-min_.jpg"
}



async function fetchingData(url) {
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result)
    return result;
}

function returnTemplate(pizza) {
    return `<div class="pizza" id="${'pizza:' + pizza.id}">
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
    <div class='allergens'>
        ${pizza.allergens}
        </div>
    <input type='button' class="add-button" id="${pizza.id}" value="ADD">
    <input type='number' class='amount-add' id="amount${pizza.id}" placeholder='amount'>
    </div>
    `
}

function displayOrder() {
    return `<form id="formularz">
    <input id="order-name" placeholder="name">
    <input id="order-second-name" placeholder="second name">
    <input id="email" placeholder="email">
    <input id="city" placeholder="city">
    <input id="street" placeholder="street">
    <input type='button' value='ORDER' id="save-order">
    </form>
    <div id="error-container" style="color:red;font-weight: bold"></div>
    `
}



async function displayPizzas() {
    const pizzaData = await fetchingData("http://localhost:3000/api/pizza");
    
    let text = "";
    // console.log(pizzaData.pizzas);
    pizzaData.pizzas.forEach(pizza => {
        text += `<div class="pizza" id="${'pizza:' + pizza.id}">
        <div class="pizza-name" >
        <h2>${pizza.name}</h2>
        </div>
        <div class="allergens" id="${pizza.allergens}"></div>
        <img src=${pizza.img}>
        <div class="cena-add-button">
            <div class="ingedients">
                <p>${pizza.ingedients}</p>
            </div>
            
        </div>
            <div class="price">
                    <p>${pizza.price}zł</p>
                </div>
        <div class='allergens'>
        ${pizza.allergens}
        </div>
            <input type='button' class="add-button" id="${pizza.id}" value="ADD">
            <input type='number' class='amount-add' id="amount${pizza.id}" placeholder='amount'>
        
        </div>
        `
    });
    return text;
}

async function swapAllergensNames(){
    const allergensArr= await fetchDatas("http://localhost:3000/api/allergen");
    // console.log(allergensArr.allergens);
    let allergensIDArr=document.getElementsByClassName('allergens');
    let text='';
    Array.from(allergensIDArr).forEach((allergen,index)=>{
        if(index%2!=0){
        console.log(allergen);
        let allergArr=allergen.innerText.split(',');
        // console.log(allergen.innerText);
        allergArr.forEach(id=>{
            let name = allergensArr.allergens.find(allerg=>allerg.id==id);
            name=name.name;
            
            text+=`${name}, `;
        })
        allergen.innerText=text;
        text='';
    }
    })
}



async function displayAllergens() {
    const allergenData = await fetchingData("http://localhost:3000/api/allergen");
    let text = "";

    allergenData.allergens.forEach(allergen => {
        text += `<h3>${allergen.name}</h3>
        <input type="checkbox" class="allergen-input" id="${'allergen:' + allergen.id}">`
    })
    return text;
}

function updateCustomPizzaObj() {
    customPizzaObject.ingredients = customPizzaIngredients;
}

function addCustomPizza() {
    let template = `
    <div class='pizza' id='pizza:8'>
        <div class='pizza-name'>
            <h2>Custom pizza</h2>
        </div>
        <img src='https://amrestcdn.azureedge.net/ph-web-ordering/Pizza_Hut_PL/NEW_WWW/314x314/PIZZA/PH_314x314_margherita-min_.jpg'>
        <div class='ingredients'>
            <div id='left-ingredients'>
                <div><input type='button' value='+' class='add-ingredient'>Mozarella</div>
                <div><input type='button' value='+' class='add-ingredient'>Tomato sauce</div>
                <div><input type='button' value='+' class='add-ingredient'>Pepperoni</div>
                <div><input type='button' value='+' class='add-ingredient'>Ham</div>
                <div><input type='button' value='+' class='add-ingredient'>Mushrooms</div>
                <div><input type='button' value='+' class='add-ingredient'>Olives</div>
                <div><input type='button' value='+' class='add-ingredient'>Grilled chicken</div>
                <div><input type='button' value='+' class='add-ingredient'>Corn</div>
                <div><input type='button' value='+' class='add-ingredient'>Red onion</div>
            </div>  
            <div id='right-ingredients'>
                
                <div><input type='button' value='+' class='add-ingredient'>Beef</div>
                <div><input type='button' value='+' class='add-ingredient'>Onion</div>
                <div><input type='button' value='+' class='add-ingredient'>Green pepper</div>
                <div><input type='button' value='+' class='add-ingredient'>Cheddar</div>
                <div><input type='button' value='+' class='add-ingredient'>Corregio</div>
                <div><input type='button' value='+' class='add-ingredient'>Garlic sauce</div>
                <div><input type='button' value='+' class='add-ingredient'>Red onion</div>
                <div><input type='button' value='+' class='add-ingredient'>Spinach</div>
                <div><input type='button' value='+' class='add-ingredient'>Bell pepper</div>
            </div>
        </div>
        <div class='price'>
        <p>64.99zł</p>
        </div>
        <input type='button' class="add-button" id="8" value='ADD'>
        <input type='number' class='amount-add' id="amount8" placeholder='amount'>
    </div>`
    document.getElementById('pizzas').insertAdjacentHTML('beforeend', template);
}



function checkIfAnyPizzaAdded(){
    return order.pizzas.length>0;
}

async function load() {
    let amount;
    let orderId = 0;
    const mainElement = document.getElementById("main")
    const rootElement = document.getElementById("root")
    const pizzasForm = document.getElementById("pizzas")
    const allergentsForm = document.getElementById('allergents')

    displayPizzas().then(response => {
        pizzasForm.insertAdjacentHTML("beforeend", response);
        addCustomPizza();
        swapAllergensNames();
    }).catch(error => {
        console.error(error);
    })

    displayAllergens().then(response => {
        allergentsForm.insertAdjacentHTML("beforeend", response);
    }).catch(error => {
        console.error(error);
    })

    const checkboxElements = document.querySelectorAll(".allergen-input")
    const pizzaElements = document.querySelectorAll(".pizza")
    const allergenElements = document.querySelectorAll(".allergens")

    window.addEventListener('change', async (e) => {
        if (e.target.classList.contains('allergen-input')) {
            const checkboxes = Array.from(document.getElementsByClassName('allergen-input'));
            let pizzas = await fetchingData("http://localhost:3000/api/pizza");
            checkboxes.forEach(box => {
                let id = box.id.split(":")[1];
                if (box.checked == true) {
                    pizzas.pizzas = pizzas.pizzas.filter(pizza => !pizza.allergens.includes(parseInt(id)));
                    
                }
            })
            document.getElementById('pizzas').replaceChildren();
            pizzas.pizzas.forEach(pizza => {
                document.getElementById('pizzas').insertAdjacentHTML('beforeend', returnTemplate(pizza));
                swapAllergensNames();
            })
            addCustomPizza();
        }
    })
    const koszykElement = document.getElementById("koszyk");
    koszykElement.disabled=true;

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-button') && e.target.value=='ADD') {
            e.preventDefault();
            let pizzaID = e.target.parentElement.id.split(':')[1];
            if(document.getElementById(`amount${pizzaID}`).value=='') document.getElementById(`amount${pizzaID}`).value=1;    
            order.pizzas.push({ id: pizzaID, amount: document.getElementById(`amount${pizzaID}`).value })
            e.target.value='REMOVE';
            
            console.log(order);
            checkIfAnyPizzaAdded() ? koszykElement.disabled=false : koszykElement.disabled=true;
        }else if(e.target.classList.contains('add-button') && e.target.value=='REMOVE'){
            let pizzaID = e.target.parentElement.id.split(':')[1];
            e.preventDefault();
            order.pizzas=order.pizzas.filter(pizza=>pizza.id!=pizzaID)
            e.target.value='ADD'
            document.getElementById(`amount${pizzaID}`).value='';
            console.log(order);
            checkIfAnyPizzaAdded() ? koszykElement.disabled=false : koszykElement.disabled=true;
        }
    })

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-ingredient')) {
            // e.target.value == '+' ? e.target.value = '-' : e.target.value = '+';
            // console.log(e.target.parentElement.innerText);
            if(e.target.value=='+'){
                e.target.value='-';
                customPizzaIngredients.push(e.target.parentElement.innerText);
            }else{
                e.target.value='+';
                customPizzaIngredients=customPizzaIngredients.filter(ingr=>ingr!==e.target.parentElement.innerText);
            }
            updateCustomPizzaObj();
            // console.log(customPizzaIngredients);
        }
    })

    koszykElement.addEventListener("click", function (event) {
        event.preventDefault()
        //     window.location.href = "http://127.0.0.1:3000/order"
        // })

        // if (window.location.href === "http://127.0.0.1:3000/order") {
        rootElement.replaceChildren();
        mainElement.replaceChildren()
        mainElement.insertAdjacentHTML("beforeend", `<button id="home">HOME</button>`)
        rootElement.insertAdjacentHTML("beforeend", displayOrder())

        let customerName;
        let customerSecondName;
        let customerEmail;
        let customerCity;
        let customerStreet;
        const orderForm = document.querySelector("form");
        const inputs = document.querySelectorAll("input");
        const orderButton = document.getElementById("save-order")
        const homeButton = document.getElementById("home");

        orderForm.addEventListener("input", function (event) {
            event.preventDefault()
            if (event.target.id === "order-name") {
                customerName = event.target.value;
                console.log(customerName);
                console.log(order);
            }
            if (event.target.id === "order-second-name") {
                customerSecondName = event.target.value;
                console.log(customerSecondName);
            }
            if (event.target.id === "email") {
                customerEmail = event.target.value;
                console.log(email);
            }
            if (event.target.id === "city") {
                customerCity = event.target.value;
                console.log(customerCity);
            }
            if (event.target.id === "street") {
                customerStreet = event.target.value;
                console.log(customerStreet);
            }
        })
        orderButton.addEventListener("click", async function (event) {
            event.preventDefault();

            // -------------- validation Order form error messages display --- START --------------
            var errorMessages = [];
            if (customerName === '' || customerName === undefined) {
                errorMessages.push('Please enter your name.');
                document.getElementById('order-name').classList.add('error');
            } else {
                document.getElementById('order-name').classList.remove('error');
            }
            if (customerSecondName === '' || customerSecondName === undefined) {
                errorMessages.push('Please enter your second name.');
                document.getElementById('order-second-name').classList.add('error');
            } else {
                document.getElementById('order-second-name').classList.remove('error');
            }
            if (customerEmail === '' || customerEmail === undefined) {
                errorMessages.push('Please enter your email.');
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            if (customerCity === '' || customerCity === undefined) {
                errorMessages.push('Please enter your city.');
                document.getElementById('city').classList.add('error');
            } else {
                document.getElementById('city').classList.remove('error');
            }
            if (customerStreet === '' || customerStreet === undefined) {
                errorMessages.push('Please enter your street.');
                document.getElementById('street').classList.add('error');
            } else {
                document.getElementById('street').classList.remove('error');
            }
            if (errorMessages.length > 0) {
                let errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = '';
                errorMessages.forEach(function (errorMessage) {
                    let errorElement = document.createElement('p');
                    errorElement.textContent = errorMessage;
                    errorContainer.appendChild(errorElement);
                });
                return;
            }
            else {
                let errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = '';
            }
            // -------------- validation Order form error messages display --- START --------------
            let currentID = await fetchLatestID();
            order.id = parseInt(currentID.id) + 1;
            order.customer.name = customerName + " " + customerSecondName
            order.customer.email = customerEmail;
            order.customer.address.city = customerCity;
            order.customer.address.street = customerStreet;
            let date = new Date()
            order.date.year = date.getFullYear()
            order.date.month = date.getMonth() + 1
            order.date.day = date.getDate()
            order.date.hour = date.getHours()
            order.date.minute = date.getMinutes()

            fetch("http://127.0.0.1:3000/order", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(order)
            })
                .then(response => response.text())
                .then((result) => {
                    console.log(result);
                })
                .catch(error => {
                    console.error(error);
                })
        })

        homeButton.addEventListener("click", function (event) {
            event.preventDefault()
            window.location.href = "http://127.0.0.1:3000/"
        })
    })
}

async function fetchLatestID() {
    // let currentID = await  fetch("http://127.0.0.1:3000/order/latestID");
    //         currentID = await currentID.json();
    const response = await fetch('http://127.0.0.1:3000/order/latestID');
    const jsonData = await response.json();
    return jsonData;
}

async function fetchDatas(path) {
    // let currentID = await  fetch("http://127.0.0.1:3000/order/latestID");
    //         currentID = await currentID.json();
    const response = await fetch(path);
    const jsonData = await response.json();
    return jsonData;
}






window.addEventListener("load", load);