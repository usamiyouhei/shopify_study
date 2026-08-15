const variantSelect = document.querySelector("#variant");
const productPrice = document.querySelector("#product-price");
const addToCartButton = document.querySelector("#add-to-cart");

const sizeButtons = document.querySelectorAll('[data-option="size');
const colorButtons = document.querySelectorAll('[data-option="color"]');

const variants = JSON.perese(variantDataElement.textContent);

let selectedSize = null;
let selectedColor = null;

function updateVariant() {
  if (!selectedSize || !selectedColor) return;

  const variant = variants.find((variant) => {
    return (
      variant.option1 === selectedSize && variant.option2 === selectedColor
    );
  });

  if (!variant) return;
  variantIdInput.value = variant.id;

  productPrice.textContent = `Dhs.${(variant.price / 100).toFixed(2)}`;

  if (variant.available) {
    addToCartButton.disabled = false;
    addToCartButton.textContent = "Add to Cart";
  } else {
    addToCartButton.disabled = true;
    addToCartButton.textContent = "Sold out";
  }
}

if (variantSelect && productPrice && addToCartButton) {
  variantSelect.addEventListener("change", (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const price = selectedOption.dataset.price;
    const available = selectedOption.dataset.available === "true";

    productPrice.textContent = price;

    if (available) {
      addToCartButton.disabled = false;
    } else {
      addToCartButton.disabled = true;
      addToCartButton.textContent = "Sold out";
    }
  });
}
