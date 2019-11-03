boiler.params.fields = "";
boiler.params["getters-and-setters"] = "";

function getField(name, type) {
    return `private ${type} ${name};
    `;
}

function getGetter(name, type) { 
    const pascalCaseProperty = boiler.string.toPascalCase(name);
    return `\n\tpublic ${type} get${pascalCaseProperty}() {
        return this.${name};
    }\n`;
}

function getSetter(name, type) {
    const pascalCaseProperty = boiler.string.toPascalCase(name);
    return `\n\tpublic void set${pascalCaseProperty}(${type} ${name}) {
        this.${name} = ${name};
    }\n`;
}

function removeLastChars(str, num) {
    return str.substr(0, str.length - num);
}

function logError(message) {
    console.error(`${boiler.Colors.Red}ERROR${boiler.Colors.Reset}: ${message}`);
}

if(boiler.params["skip-fields"]) {
    return;
}

let requestProps = (await new boiler.prompt.TextPrompt().show("Would you like to add fields for this class? (y/n)")).getValue() === "y";
if(requestProps) {
    let addedFields;
    while(true) {
        let message;
        if(!addedFields) {
            message = `Enter field (e.g. "String color") (Enter "q" to quit)`;
        } else {
            message = `Enter field (Enter "q" to quit)`;
        }
        const value = (await new boiler.prompt.TextPrompt().show(message)).getValue();
        if(!value || value === "q" || value.trim() === "") {
            if(addedFields) {
                boiler.params["getters-and-setters"] = removeLastChars(boiler.params["getters-and-setters"], 1);
            }
            break;
        }
        const [type, name] = value.split(" ");
        if(!type) {
            logError(`Field type must be defined. Please try again.\n`);
            continue;
        }
        if(!name) {
            logError(`Field name must be defined. Please try again.\n`);
            continue;
        }
        boiler.params.fields += getField(name, type);
        boiler.params["getters-and-setters"] += getGetter(name, type) + getSetter(name, type);
        addedFields = true;
    }
}