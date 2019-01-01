(function (num) {
    for (let i = 0; i < num; i++) {
        document.getElementById('a').innerHTML += (`
        <div class='box'>
            <input type="checkbox" data-id=${i}>
        </div>`);
    }
}(20));

const squares = squaresObserver();

const squaresArray = document.querySelectorAll('input[type="checkbox"]');

for (let i = 0; i < squaresArray.length; i++) {
    squaresArray[i].addEventListener('click', function () {
        if (this.checked) {
            const square = new Subscriber(this.dataset);
            squares.subscribe(square);
        }
        else 
            squares.unsubscribe(this.dataset.id);
    })
}

function squaresObserver() {

    var squaresSubscribe = [];

    function subscribe(square) {
        squaresSubscribe.push(square);
    }

    function unsubscribe(squareId) {
        for (var i = 0; i < squaresSubscribe.length; i++) {
            if (squaresSubscribe[i].square.id === squareId) 
                squaresSubscribe.splice(i, 1);
        }
    }

    function notify() {
        const randomNumber = Math.floor(Math.random() * squaresArray.length);
        for (let i = 0; i < squaresSubscribe.length; i++) {
            squaresSubscribe[i].notifySubscriber(randomNumber);
        }
    }

    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        notify: notify
    }
}

function Subscriber(square) {
    this.square = square;
}

Subscriber.prototype.notifySubscriber = function (number) {
    if (number == this.square.id) {
        var select = '[data-id = \'' + number + '\']';
        document.querySelector(select).parentElement.style.backgroundColor = 'green';
    }
}

setInterval(function () {
    squares.notify()
}, 3 * 1000);
