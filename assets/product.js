const variantSelect = document.querySelector("#variant");
const productPrice = document.querySelector("#product-price");
const addToCartButton = document.querySelector("#add-to-cart");

if (variantSelect && productPrice && addToCartButton) {
  variantSelect.addEventListener("change", (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const price = selectedOption.dataset.price;
    const available = selectedOption.dataset.available === "true";

    productPrice.textContent = price;

    if (available) {
      addToCartButton.disabled = false;
      addToCartButton.textContent = "Add to Cart";
    } else {
      addToCartButton.disabled = true;
      addToCartButton.textContent = "Sold out";
    }
  });
}
