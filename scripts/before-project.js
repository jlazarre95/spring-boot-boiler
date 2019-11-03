const projectPath = boiler.params.name;

if(boiler.params.force) {
    fs.emptyDirSync(projectPath);
} else { 
    fs.mkdirSync(projectPath);
}

process.chdir(projectPath);
fs.ensureDirSync(`src/main/java`);
fs.ensureDirSync(`src/main/resources`);
fs.ensureDirSync(`src/test/java`);
fs.ensureDirSync(`src/test/resources`);

const deps = {
    "use-mongo": `compile("org.springframework.boot:spring-boot-starter-data-mongodb")` 
};

boiler.params.dependencies = "";
for(const dep in deps) {
    if(boiler.params[dep]) {
        boiler.params.dependencies += `\n\t${deps[dep]}`;
    }
}
