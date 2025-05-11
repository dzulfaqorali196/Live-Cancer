// Shim for ajv/dist/compile/codegen
// This is a fallback in case the normal path resolution fails

const codegen = {
  // Menyediakan fungsi-fungsi dasar yang diperlukan
  // Ini sangat minimal dan hanya ditujukan sebagai fallback
  _: (s) => s,
  str: (s) => JSON.stringify(s),
  name: (s) => s,
  nil: () => null,
  getProperty: (obj, key) => obj[key],
  regExp: (pattern, flags) => new RegExp(pattern, flags),
};

module.exports = codegen; 