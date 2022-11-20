import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");



class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducrs(e));
 this.ss=""
   this.proid= []
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
    document.querySelector("#product-title").value ="";
    
    // document.querySelector("#product-quantity").value=""
    
  }
  createProductsList(products) {
    // const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find((c) => c.id == item.category);
      

      result += `
    <div class="product">
     <span class="title">${item.title}</span>
     <div class="product-tesk">
        <span class="date">${new Date().toLocaleDateString()}</span>
        <span class="ca">${selectedCategory.title}</span>
  
        <span class="q">${ item.quantity}</span>
          
           
          
        <button 
        data-product-id=${item.id}>delete</button>
        <button data-product-id=${item.id} class="edit">Edit</button>
     </div>
       
      </div>
    `;
    });

    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;

    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });

    const edit =[...document.querySelectorAll(".edit")];


    edit.forEach((b)=>{
      b.addEventListener('click',(e)=>this.editpro(e));
    })
    
    
    
    
  }
  
searchProducts(e) {
  const value = e.target.value.trim().toLowerCase();
  const filteredProducts = this.products.filter((p) => p.title.toLowerCase().includes(value));
  console.log(this.products);
  this.createProductsList(filteredProducts);};


  // let sss = "";
  editpro(e){
    this.ss= e.target.dataset.productId
    // let ss=;
    // console.log(produdcId)
    // const selected = Storage.getAllProducts().find((c)=>c.id==produdcId);
    // console.log(selected)
    // this.okk(produdcId)
    let ok = document.querySelector(".ok");
    const can = document.querySelector(".can")

    can.addEventListener('click',()=>{
      event.stopPropagation();
      ok.disabled=true
    
    })
    ok.addEventListener('click',()=>{
event.stopPropagation();
      const id = this.ss
      console.log(id)
      const title = document.querySelector(".titleEdit").value;
      const quantity =document.querySelector(".quanEdit").value; 
      const category = document.querySelector("#product-categoryy").value;
      if (!title || !category || !quantity) return;
      Storage.saveProducts({id,title,quantity,category}); 
  
        this.products = Storage.getAllProducts();
      
        this.createProductsList(this.products);
      
    })
;


   
  }

// okk(){
  // console.log(selected)
  // console.log(idd)
  // this.createProductsList(this.products);
  

  // searchProducts(e){
  //   const value = searchInput.target.value.trim().toLowerCase();
  //   const searcheed = this.products.filter((p)=>{
  //     p.title.toLowerCase().includes(value);
  //     this.createProductsList(searcheed)
  //   })
  // }
  




  sortProducrs(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
  deleteProduct(e) {
    const produdcId = e.target.dataset.productId;
    Storage.deleteProduct(produdcId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }



}

export default new ProductView();