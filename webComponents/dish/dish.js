class dish extends HTMLElement {
    constructor(){
        super();
        this.index;
        this.name;
        this.menu;
        this.price;
        this.description;
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['id', 'menu'];
    }
    
    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch(nameAtr){
            case 'id':
                this.index = newValue;
                console.log("id readed");
            break;
            case 'menu':
                this.menu = newValue;
                console.log("menu readed");
            break;
        }
    }

    connectedCallback(){
        if (this.index && this.menu) {
            fetch(`http://127.0.0.1:5500/webComponents/dish/data/${this.menu}.json`)
            .then(response => response.json())
            .then(data => {
              this.name = data[this.index].name;
              this.price = data[this.index].price;
              this.setAttribute("name", this.name);
              this.setAttribute("price", this.price);
              this.description = data[this.index].description;
              this.render();
              this.setEvents();
            })
            .catch(error => {
              console.error(error);
            });
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/style/bootstrap.min.css">
        <link rel="stylesheet" href="webComponents/dish/dish.css">
        <div class="card mt-2">
            <div class="card-body row">
                <div class="dish-name col-7 text-start">${this.name}</div>
                <div class="price col-4 text-end">${this.price}€</div>
                <div class="col-1 card-dropdown p-0">↓</div>
                <div class="info col-12">
                    <ul>
                        <li>${this.description}</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    }

    setEvents() {
        const card = this.shadowRoot.querySelector(".card");
        const cardDrop = this.shadowRoot.querySelector(".card-dropdown");
        
        //Toogle dropdown
        cardDrop.addEventListener('click', (e) => {
            var panel = cardDrop.nextElementSibling;
            e.stopPropagation();
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
              panel.style.marginTop = "0px";
              cardDrop.style.transform = "inherit";
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
              panel.style.marginTop = "10px";
              cardDrop.style.transform = "rotateX(180deg)";
            }
            console.log('Child element clicked!');
        });
        
        //Add dish to ticket
        this.addEventListener('click', function() {
            card.classList.toggle("selected");
            const ticketList = document.querySelector("app-ticket #items");
            const ticketItem = document.createElement("app-ticket-item");
            ticketItem.setAttribute("name", this.name);
            ticketItem.setAttribute("price", this.price);
            ticketList.appendChild(ticketItem);
            console.log('Parent element clicked!');
            setTimeout(()=>{
                card.classList.toggle("selected");
            }, 500);
        });
    }
    
}
window.customElements.define('app-dish', dish);