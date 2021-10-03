"use strict";
function parse_rule(line) {
    if ((line.match(/->/g) || []).length != 1)
        return false;
    let rate = 1;
    line = line.replace(/\((\d+)\)/, (z, x) => { rate = +x; return ''; });
    let [start, end] = line.split('->').map(a => a.split('+').map(b => new Species({ matcher: b.trim() })));
    //TODO: add more conditions (and error messages?)
    if (start.length != end.length || start.length > 2 || start.length == 0)
        return false;
    return new Transition_Rule({ reactants: start, products: end, rate: rate, is_mono: start.length == 1 });
}
function parse_option(line) {
    if ((line.match(/=/g) || []).length != 1)
        return false;
    return line.split('=').map(a => a.trim());
}
function parse_colour(line) {
    let vars = line.match(/^(?:\{([^}]+)\})? *((?: *[^,: ]+,? *)+) *: *\((\d+) *, *(\d+) *, *(\d+)\)$/);
    if (vars == null)
        return false;
    var sp = vars[2].split(/,\s*|\s+/).map(a => new Species({ matcher: a.trim() }));
    return new Colour_Map({ name: vars[1], species: sp, colour: new Colour({ red: +vars[3], green: +vars[4], blue: +vars[5] }) });
}
function parse_line(line, program) {
    var rule = parse_rule(line);
    if (rule !== false) {
        program.rules.push(rule);
        return true;
    }
    var colour = parse_colour(line);
    if (colour !== false) {
        program.colour_mapping.push(colour);
        return true;
    }
    var option = parse_option(line);
    if (option !== false) {
        let [val, key] = option;
        program.options.set(val, key);
        return true;
    }
    return false;
}
function parse_init_state(line) {
    return line.split(/\s+|,/).map(a => new Species({ matcher: a }));
}
function parse_code(data) {
    let init_state_section = false;
    let program = new Surface_CRN();
    for (let line of data) {
        line = line.trim().replace(/#.*/, "");
        if (line == "")
            continue;
        let val;
        if (!init_state_section) {
            if (line == "!START_INIT_STATE") {
                init_state_section = true;
                continue;
            }
            let val = parse_line(line, program);
        }
        else {
            if (line == "!END_INIT_STATE") {
                init_state_section = false;
                continue;
            }
            let val = parse_init_state(line);
            program.initial_state.push(val);
        }
    }
    return program;
}
