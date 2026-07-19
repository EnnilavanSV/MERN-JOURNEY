const capitalize = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const truncate = (str, maxLength) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
};

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-");
};

module.exports = { capitalize, truncate, slugify };
