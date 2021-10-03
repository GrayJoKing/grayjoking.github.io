
class Manifest_File {
	data: string[] = [];
	imported: boolean = false;
}


document.getElementById("import_submit")?.addEventListener("click", async function(e:MouseEvent) {
	const import_input = <HTMLInputElement> document.getElementById("import_input");
	
	const input_files:FileList|null = import_input.files;
	
	if (!input_files) {
		//show error
		console.log("No input files")
		return false;
	}
	
	let manifest_maps = new Map<string, Manifest_File>(); ;
	
	for (let file of input_files) {
		var m = new Manifest_File();
		m.data = (await file.text()).split("\n").map(a => a.trim().replace(/#.*/,''))
		manifest_maps.set(file.name, m)
	}
	
	for (let [key, m] of manifest_maps) {
		for (let s of m.data) {
			if (s.match(/^!INCLUDE /)) {
				//replace includes
			}
		}
	}
	
	let lines:string[] = [];
	
	for (let [key, m] of manifest_maps) {
		if (!m.imported) lines.push(...m.data);
	}
	
	var p = parse_code(lines);
	
	update_page(p);
})


function update_page(program: Surface_CRN) {
	update_rules(program.rules);
	update_colour_map(program.colour_mapping);
	update_init_state(program.initial_state, program.colour_mapping);
}

function update_rules(rules:Transition_Rule[]) {
	var rule_list = document.getElementById("rule_list");

	if (rule_list == null) return;
	
	rule_list.textContent = '';
	
	for (let r of rules) {
		var row = document.createElement("tr");
		for (var [i, type] of [r.reactants, r.products].entries()) {
			var item;
			if (i == 1) {
				item = document.createElement("td");
				item.textContent = '=>';
				row.appendChild(item);
			}
			for (var [j, species] of type.entries()) {
				if (j == 1) {
					item = document.createElement("td");
					item.textContent = '+';
					row.appendChild(item);
				}
				item = document.createElement("td");
				var inp = document.createElement("input");
				inp.type = "text";
				inp.value = species.matcher;
				item.appendChild(inp);
				row.appendChild(item);
			}
		}
		rule_list.appendChild(row);
	}
}

function update_colour_map(colour_map:Colour_Map[]) {
	var colour_list = document.getElementById("colour_list");
	if (colour_list == null) return;
	
	colour_list.textContent = '';
	
	console.log(colour_map);
	for (let c of colour_map) {
		var row = document.createElement("tr");
		var item;
		item = document.createElement("td");
		var inp = document.createElement("input");
		inp.type = "text";
		inp.value = c.name;
		item.appendChild(inp);
		row.appendChild(item);

		item = document.createElement("td");
		item.textContent = c.colour.stringify();
		row.appendChild(item);
		console.log(c.species);
		for (var species of c.species) {
			item = document.createElement("td");
			var inp = document.createElement("input");
			inp.type = "text";
			inp.value = species.matcher;
			item.appendChild(inp);
			row.appendChild(item);
		}
		colour_list.appendChild(row);
	}
}

function update_init_state(init_state:Species[][], colour_map:Colour_Map[]) {
	
}