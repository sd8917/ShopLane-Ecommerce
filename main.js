console.log("script loaded");

/*Carosel  start*/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
/*Carosel end */




/*Product Retrival design */
var productDetailSection = $("#product-detail");
var leftSectionWrapper = $(".left-section-img-wrapper");
var rightSectionWrapper = $(".rigt-section-detail-wrapper");
var product;
function productDetail(id){
  // alert(`card clicked : ${id}`);
  //now make api request to product detail page for page retrival.
  alert(id);
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + id, function(productData){
    // product = productData;
    // alert(productData.id + productData.name);
    //Create product detail page .... 
    alert("want to go to detail page !!  press "  + productData.name);

    window.location.href = "detail.html";
    
    alert("detail page pe")
    leftSectionWrapper.append(`
      <img src="${productData.preview}" />
    `)

    var rightCard = (`
      <h2 id="product-title">${productData.name}</h2>
      <h5 id="product-brand">${productData.brand}</h5>
      <h5 id="product-price">Price Rs. <span>${productData.preview}</span></h5>

      <div class="desc-wrapper">
          <h5>Description</h5>
          <p class="desc-para">
                ${productData.description}.
          </p>
      </div>


      <div class="prev-img-wrapper">
          <h5>Product Preview</h5>
          <img src="" alt="Not found"/>
      </div>
      <button id="btn-add-card">Add to cart</button>

    `)
    rightSectionWrapper.append(rightCard);

    // console.log(rightSectionWrapper);
    productDetailSection.append(leftSectionWrapper,rightSectionWrapper).attr("id", id);

  
  })
}



var clothingSectionWrapper = $(".clothing-section-wrapper");
clothingSectionWrapper.append(`
    <h2  id="clothing">Clothing for Men and Women</h2>
`)


var clothColCardWrapper = $(".clothing-col-card-wrapper");

var accessoriesSectionWrapper = $(".accessories-section-wrapper");
accessoriesSectionWrapper.append(`
<h2  id="accessories" >Accessories  for Men and Women</h2>
`)
var accessoryColCardWrapper = $(".accessories-col-card-wrapper");

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function(response){
  // console.log(response);

 
  for(var i = 0; i < response.length;i++){
    // console.log(response[i].name);

    //check if it is cloth then to cloth section else to accessories section
    if(response[i].isAccessory){
      //console.log(response[i].name + "accessories");
      // add to accessories section give id to it.
            var card = `
            <div class="card" id="${response[i].id}"  onclick="productDetail(${response[i].id})">

              <img src="${response[i].preview}"
                  alt="not found">
              <div class="card-contain">
                  <h4 id="card-title">${response[i].name} </h4>
                  <p id="desc">${response[i].brand}</p>
                  <span id="price">RS . ${response[i].price}</span>
              </div>

            </div>
            `

            // console.log($(card).attr("id"));
      accessoryColCardWrapper.append(card)
      

    }
    else{
      //console.log(response[i].name + "clothing")
      // add to clothing section give id to it.

      var card = `
      <div class="card" id="${response[i].id}" onclick="productDetail(${response[i].id})">

        <img src="${response[i].preview}"
            alt="not found">
        <div class="card-contain">
            <h4 id="card-title">${response[i].name} </h4>
            <p id="desc">${response[i].brand}</p>
            <span id="price">Rs .${response[i].price}</span>
        </div>

      </div>

      `

    clothColCardWrapper.append(card)

    }

  }
  
  clothingSectionWrapper.append(clothColCardWrapper);
  accessoriesSectionWrapper.append(accessoryColCardWrapper);
  

})

// console.log("product " + product)

/* Product retrival*/