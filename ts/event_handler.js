"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
class Manifest_File {
    constructor() {
        this.data = [];
        this.imported = false;
    }
}
(_a = document.getElementById("import_submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        const import_input = document.getElementById("import_input");
        const input_files = import_input.files;
        if (!input_files) {
            //show error
            console.log("No input files");
            return false;
        }
        let manifest_maps = new Map();
        ;
        for (let file of input_files) {
            var m = new Manifest_File();
            m.data = (yield file.text()).split("\n").map(a => a.trim().replace(/#.*/, ''));
            manifest_maps.set(file.name, m);
        }
        for (let [key, m] of manifest_maps) {
            for (let s of m.data) {
                if (s.match(/^!INCLUDE /)) {
                    //replace includes
                }
            }
        }
        let lines = [];
        for (let [key, m] of manifest_maps) {
            if (!m.imported)
                lines.push(...m.data);
        }
        var p = parse_code(lines);
        update_page(p);
    });
});
function update_page(program) {
    update_rules(program.rules);
    update_colour_map(program.colour_mapping);
    update_init_state(program.initial_state, program.colour_mapping);
}
function update_rules(rules) {
    var rule_list = document.getElementById("rule_list");
    if (rule_list == null)
        return;
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
function update_colour_map(colour_map) {
    var colour_list = document.getElementById("colour_list");
    if (colour_list == null)
        return;
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
function update_init_state(init_state, colour_map) {
}
