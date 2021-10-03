
class Surface_CRN {
	initial_state:Species[][] = [];
	rules:Transition_Rule[] = [];
	colour_mapping:Colour_Map[] = [];
	options:Map<string, string> = new Map();
}

class Colour {
	red:number = 0;
	green:number = 0;
	blue:number = 0;
	public constructor(init?:Partial<Colour>) {
		Object.assign(this, init);
	}
	
	public stringify() {
		return "("+[this.red,this.green,this.blue].join(',')+")";
	}
}

class Colour_Map {
	name:string = "";
	species:Species[] = [];
	colour:Colour = new Colour();
	public constructor(init?:Partial<Colour_Map>) {
		Object.assign(this, init);
	}
}

class Species {
	matcher:string = "";
	public constructor(init?:Partial<Species>) {
		Object.assign(this, init);
	}
}

class Transition_Rule {
	is_mono:boolean = true;
	reactants:Species[] = [];
	products:Species[] = [];
	rate:number = 1;
	public constructor(init?:Partial<Transition_Rule>) {
		Object.assign(this, init);
	}
}