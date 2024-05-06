const markdownit = require("markdown-it");
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

module.exports = {
  convertMarkdowntoHTML: async function (data) {
    try {
      if (data == null) return;
      const result = md.render(data);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  },
};
