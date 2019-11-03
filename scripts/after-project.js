const projectPath = boiler.params.name;
process.chdir(projectPath);
console.log("Executing gradle wrapper...");
child_process.execSync("gradle wrapper");
console.log("Executing gradle build...");
child_process.execSync("gradle build");
console.log("Done!");