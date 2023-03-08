class Ticket extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.addEvents();
    }

    render() {
        this.innerHTML = `
            <ul id="items"></ul>
            <div id="underline"></div>
            <div id="total-container" class="row mt-2">
                <p class="col-7">Total Cost: </p>
                <p class="col-4 text-end"><span id="total-price">0.00</span><span> €</span></p>
            </div>
           
        `;
    }

    addEvents() {
        //List of items added to the ticket
        const target = document.querySelector('#items');
        //Span with the total price
        const total = document.querySelector('#total-price');

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    let sum = 0;
                    mutation.target.childNodes.forEach(node => {
                        //Calc the sum of all elements price
                        sum += parseFloat(node.getAttribute('price'));
                });
                total.innerHTML = sum.toFixed(2);
                }
            });
        });
        //Monitor the target node for the addition of new child nodes or removal of existing child nodes. 
        const config = { childList: true };
        //Set target to observe and config
        observer.observe(target, config);
    }
}

window.customElements.define('app-ticket', Ticket);