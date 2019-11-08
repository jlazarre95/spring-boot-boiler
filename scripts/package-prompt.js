const message = `Would you like to create a new package? (y/n)`;
const createPackage = (await new boiler.prompt.TextPrompt().show(message)).getValue() === "y";

if(createPackage) {
    const result = await new boiler.prompt.TextPrompt().show("Enter the fully qualified package name");
    boiler.params.package = result.getValue().replace(new RegExp("(\\\\)|\/", "g"), ".");
} else {
    const packages = (await boiler.fs.readFolder("src/main/java"))
        .filter(file => file.stats.isDirectory())
        .map(file => file.path.substr("src/main/java".length + 1).replace(new RegExp("(\\\\)|\/", "g"), "."));
    const result = await new boiler.prompt.ListPrompt().show("Select a package", packages);
    boiler.params.package = result.getValue();
}