class Nav extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.setEvents();
    }

    render() {
        this.innerHTML = `
        <div class="row">
            <div class="col-6 p-0">
                <button type="button" id="primer" class="btn btn-outline-info">Primeros</button>
            </div>
            <div class="col-6 p-0">
                <button type="button" id="segon" class="btn btn-outline-info">Segundos</button>
            </div>
        </div>
        <div class="row m-0">
            <div class="col-6 p-0">
                <button type="button" id="beguda" class="btn btn-outline-info">Bebidas</button>
            </div>
            <div class="col-6 p-0">
                <button type="button" id="postre" class="btn btn-outline-info">Postres</button>
            </div>
        </div>
        `;
    }

    setEvents() {
        const primer = document.getElementById("primer");
        const segon = document.getElementById("segon");
        const beguda = document.getElementById("beguda");
        const postre = document.getElementById("postre");
        
        const buttons = [primer, segon, beguda, postre];

        primer.addEventListener('click', async function () {
            removeContent();
            toggleActive(this, buttons);
            await addDishesToPage("primers");
        });
        segon.addEventListener('click', async function () {
            removeContent();
            toggleActive(this, buttons);
            await addDishesToPage("segons");
        });
        beguda.addEventListener('click', async function () {
            removeContent();
            toggleActive(this, buttons);
            await addDishesToPage("begudes");
        });
        postre.addEventListener('click', async function () {
            removeContent();
            toggleActive(this, buttons);
            await addDishesToPage("postres");
        });
        postre.classList.remove
    }
    
}
window.customElements.define('app-nav', Nav);

function toggleActive(button, buttons) {
    buttons.forEach(b => {
        if (b.classList.contains('active')) {
            b.classList.remove('active');
        }
    })
    button.classList.toggle('active');
}

//Remove inner of content
function removeContent() {
    const content = document.querySelector('.content');
    content.classList.toggle("clear");
    content.innerHTML = "";
    setTimeout(()=>{
        content.classList.remove("clear");
    }, 100);
}

async function addDishesToPage(menu) {
    const count = await countDishes(menu);
    for (var i = 0; i <= count; i++) {
        const dishElement = document.createElement("app-dish");
        dishElement.setAttribute("id", i);
        dishElement.setAttribute("menu", menu);
        const content = document.querySelector('.content');
        content.appendChild(dishElement);
    }
}

async function countDishes(menu) {
    const response = await fetch(`http://127.0.0.1:5500/webComponents/dish/data/${menu}.json`);
    const data = await response.json();
    return data.length-1;
}