"use strict";
class Surface_CRN {
    constructor() {
        this.initial_state = [];
        this.rules = [];
        this.colour_mapping = [];
        this.options = new Map();
    }
}
class Colour {
    constructor(init) {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        Object.assign(this, init);
    }
    stringify() {
        return "(" + [this.red, this.green, this.blue].join(',') + ")";
    }
}
class Colour_Map {
    constructor(init) {
        this.name = "";
        this.species = [];
        this.colour = new Colour();
        Object.assign(this, init);
    }
}
class Species {
    constructor(init) {
        this.matcher = "";
        Object.assign(this, init);
    }
}
class Transition_Rule {
    constructor(init) {
        this.is_mono = true;
        this.reactants = [];
        this.products = [];
        this.rate = 1;
        Object.assign(this, init);
    }
}
