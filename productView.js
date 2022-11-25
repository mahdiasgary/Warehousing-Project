import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");




let ss = [];
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducrs(e));

  

    this.proid = [];
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value;
    const quantity = document.querySelector("#product-quantity").value;
    const category = document.querySelector("#product-category").value;
    if (!title || !category || !quantity) return;
    Storage.saveProducts({ title, category, quantity });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    document.querySelector("#product-title").value = "";

    // document.querySelector("#product-quantity").value=""
  }
  createProductsList(products) {
    // const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );

      result += `
    <div class="product">
    <div class="ddd">
    <span class="title">${item.title}</span>
    <div class="product-tesk">
        <span class="date">${new Date().toLocaleDateString()}</span>
        <span class="ca">${selectedCategory.title}</span>
  
        <span class="q">${item.quantity}</span>
          
           
          
        <button 
        data-product-id=${item.id} class="dell">delete</button>
        <button data-product-id=${item.id}  class ="editt">Edit</button></div>
     </div>
<div id=${item.id}></div>
       
      </div>
    `;
    
    });

    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;

    const deleteBtns = [...document.querySelectorAll(".dell")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        const produdcId = e.target.dataset.productId;
        Storage.deleteProduct(produdcId);
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
      });
    });

    const edit = document.querySelectorAll(".editt");
   
    edit.forEach((b) => {
      b.addEventListener("click", (e) => this.editpro(e));
    });

 

  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    console.log(this.products);
    this.createProductsList(filteredProducts);
  }

  // let sss = "";
  editpro(e) {
    
    ss.push(e.target.dataset.productId);
    let caca = Storage.getAllCategories()
    let er = document.getElementById(e.target.dataset.productId)
    console.log(er)
    er.innerHTML = ` <div data-product-id=${e.target.dataset.productId} > <input type="text" class="titleEdit"  placeholder=" new title"/>
    <input type="text" class="quanEdit" placeholder="new quantity" />
    <div>
    <label for="product-category" >
    category
    </label>
    <select
    name="product-category"
    id="product-categoryy"
    class="wer">
    
    <option value="" >
      select a category


   

    </option>
  </select>
  </div>


          <div class="editBtn">
    <button class="ok">OK</button>
    <button class="can">cansel</button>
 </div>`;

 let wer = document.querySelector(".wer")

 let result = `<option class="bg-slate-500 text-slate-300" value="">select a category</option>`;
 caca.forEach((element) => {
   result += `<option class="bg-slate-500 text-slate-300" value=${element.id}>${element.title}</option>`;
 });
 console.log(wer)
wer.innerHTML=result




 let can = document.querySelectorAll(".can");
 can.forEach(p=>{
 
   
   p.addEventListener("click",()=>{
    let fff = `<div></div>`
     er.innerHTML=fff
    })
  })
  
  
  let ok = document.querySelector(".ok");

 ok.addEventListener("click", (e) => {
  e.stopPropagation();
  const id = ss[ss.length - 1];
  // const last = id[id.length-1]
  console.log(id);
  const title = document.querySelector(".titleEdit").value;
  const quantity = document.querySelector(".quanEdit").value;
  const category = document.querySelector("#product-categoryy").value;
  if (!title || !category || !quantity) return;
  let www = { id: id, title, quantity, category };

  Storage.saveProducts(www);

  this.products = Storage.getAllProducts();

  this.createProductsList(this.products);
  ss = [];
});



  }
  sortProducrs(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
}

export default new ProductView();
