const slugify = require("slugify")

class Utils {
  convertToSlug = (value) => {
    const slug = slugify(value, {
      lower: true,
      remove: /[*+~.()'"!:@,]/g,
    });

    return slug
  }

  getPagination = (page, size) => {
    const limit = size ? +size : 0;
    const offset = page === 1 ? 0 : (page - 1) * limit;

    return { limit, offset };
  };
}

module.exports = new Utils()