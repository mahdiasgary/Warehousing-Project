// import CategoryView from "./categoryview.js";
// import productView from "./s.js";

// document.addEventListener("DOMContentLoaded", () => {
//   // setApp => categories : OK
//   CategoryView.setApp();
//   // productView.setApp();
//   // create categories options
//   CategoryView.createCategoriesList();
//   //
//   productView.creatPro(productView.products);
// });

import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  // setApp => categories : OK
  CategoryView.setApp();
  ProductView.setApp();
  // create categories options
  CategoryView.createCategoriesList();
  //
  ProductView.createProductsList(ProductView.products);
});