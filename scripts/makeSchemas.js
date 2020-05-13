compileFromFile = require("json-schema-to-typescript").compileFromFile;
directoryTree = require("directory-tree");
fs = require("fs");

fs.writeFileSync(
  "src/types/model.ts",
  "/* tslint:disable */\n/** Autmatically generated. Execute `npm run make-schemas` to regenerate **/\n\n"
);

directoryTree("./src/schemas", { extensions: /\.json$/ }, (item) => {
  console.log(item.path);

  compileFromFile(item.path, {
    cwd: "./src/schemas",
    bannerComment: "// ----------------------------------------------- ",
  }).then((ts) => fs.appendFileSync("./src/types/model.ts", ts));
});
