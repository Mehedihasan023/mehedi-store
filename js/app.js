
// fetch url and load data 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd); 

  for (const product of allProducts) {
    const rates = parseFloat(product.rating.rate);
    const sta = (rates/5)*100;
    const staf = Math.round(sta/10)*10;
    
    // get image of every product
    const images = product.image;
    // create a div for every product 
    const div = document.createElement("div");
    // div.classList.add("");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${images}></img>
      </div>
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p> 
          <div>Rating:<div class="stars-outer" id="${product.id}"><div class="stars-inner"style="width:${staf}%"></div></div>
          <span class="text-danger fw-bold fs-4">(${product.rating.rate})</div>
          <h5>Rating Count:<span class="text-success fw-bold fs-4">${product.rating.count}</span></h5>
          <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <button onclick="showDetails('${product.description}')" id="details-btn" class="btn btn-danger">Details</button>
      </div> 
      `;
      console.log(sta);
    document.getElementById("all-products").appendChild(div);
  }
};

// show details 

const showDetails=(detail)=>{
  document.getElementById("details").textContent="";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class=" bg-light p-5">
      <h3> Product details:  </h3>
      <p>${detail}</p>
  </div>
  `;
  document.getElementById("details").appendChild(div);
};

//  cart function update add cart value 

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// function to  convert string value in float

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};