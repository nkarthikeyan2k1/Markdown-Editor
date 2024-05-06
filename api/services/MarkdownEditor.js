const markdownit = require("markdown-it");

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  table: true,
  breaks: true,
  footnote: true,
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
