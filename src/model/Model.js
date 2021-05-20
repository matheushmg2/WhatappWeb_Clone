import { ClassEvent } from "../utils/ClassEvent";

export class Model extends ClassEvent{

    constructor(){
        super();
        this._data = {};
    }

    // Vai Receber um Json
    fromJSON(json){
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    }

    // Vai Gerar um Json
    toJSON(){
        return this._data;
    }

}