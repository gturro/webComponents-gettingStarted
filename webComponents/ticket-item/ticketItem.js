class TicketItem extends HTMLElement {
    constructor(){
        super();
        this.name;
        this.price;
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        return ['name', 'price'];
    }
    
    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch(nameAtr){
            case 'name':
                this.name = newValue;
                console.log("item ticket name readed");
            break;
            case 'price':
                this.price = newValue;
                console.log("item ticket price readed");
            break;
        }
    }

    connectedCallback(){
        this.render();
        this.setEvents();
    }

    render() {
        this.shadowRoot.innerHTML  = `
        <link rel="stylesheet" href="/style/bootstrap.min.css">
        <link rel="stylesheet" href="webComponents/ticket-item/ticketItem.css">
        <li>
            <div class="row">
                <div class="dish-name col-7 text-start">${this.name}</div>
                <div class="price col-4 text-end">${this.price} €</div>
                <div class="trash col-1 p-0"><img src="/res/trash-can.png" alt="trashCan"></div>
            </div>
        </li>
        `;
    }
    
    setEvents() {
        const deleteBtn = this.shadowRoot.querySelector('.trash');
        deleteBtn.addEventListener('click', () => {
            this.remove();
        })
    }
}

window.customElements.define('app-ticket-item', TicketItem);