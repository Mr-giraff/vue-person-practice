const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("static", resolve("src/static"))
      .set("utils", resolve("src/utils"));
    config.devtool("source-map");
  }
};
