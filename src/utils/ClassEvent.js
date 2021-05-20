export class ClassEvent {
    
    constructor() {

        this._events = {};

    }

    on(eventName, fn){

        if(!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn);

    }

    trigger(){

        let args = [...arguments]; // Convertendo em Array
        let eventName = args.shift(); // Pagou o primeiro elemento do Array e mandou para a variavel

        args.push(new Event(eventName));

        if(this._events[eventName] instanceof Array) {
            this._events[eventName].forEach(fn => {
                
                fn.apply(null, args);

            });
        }

    }
}