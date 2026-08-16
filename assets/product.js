const sizeButtons = document.querySelectorAll('[data-option="size"]');
const colorButtons = document.querySelectorAll('[data-option="color"]');
// const variantSelect = document.querySelector("#variant");
const productPrice = document.querySelector("#product-price");
const addToCartButton = document.querySelector("#add-to-cart");

const variantDataElement = document.querySelector("#product-variants");
const variantIdInput = document.querySelector("#variant-id");

if (variantDataElement && variantIdInput && productPrice && addToCartButton) {
  const variants = JSON.parse(variantDataElement.textContent);

  let selectedSize = null;
  let selectedColor = null;

  // Variant 検索用関数
  function updateVariant() {
    if (!selectedSize || !selectedColor) return;

    const variant = variants.find((variant) => {
      return (
        variant.options[0] === selectedSize &&
        variant.options[1] === selectedColor
      );
    });

    if (!variant) {
      console.log("Variant not found", {
        selectedSize,
        selectedColor,
        variants,
      });
      return;
    }
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

  // SizeButtonをクリック
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.value;

      console.log("size:", selectedSize);

      sizeButtons.forEach((item) => {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");
      updateVariant();
    });
  });

  // ColorButtonをクリック
  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedColor = button.dataset.value;
      console.log("color:", selectedColor);

      colorButtons.forEach((item) => {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");
      updateVariant();
    });
  });
}

// if (variantSelect && productPrice && addToCartButton) {
//   variantSelect.addEventListener("change", (event) => {
//     const selectedOption = event.target.options[event.target.selectedIndex];
//     const price = selectedOption.dataset.price;
//     const available = selectedOption.dataset.available === "true";

//     productPrice.textContent = price;

//     if (available) {
//       addToCartButton.disabled = false;
//     } else {
//       addToCartButton.disabled = true;
//       addToCartButton.textContent = "Sold out";
//     }
//   });
// }
