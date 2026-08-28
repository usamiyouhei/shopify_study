const sizeButtons = document.querySelectorAll('[data-option="size"]');
const colorButtons = document.querySelectorAll('[data-option="color"]');

const productPrice = document.querySelector("#product-price");
const addToCartButton = document.querySelector("#add-to-cart");

const variantDataElement = document.querySelector("#product-variants");
const variantIdInput = document.querySelector("#variant-id");

if (variantDataElement && variantIdInput && productPrice && addToCartButton) {
  const variants = JSON.parse(variantDataElement.textContent);

  const currentVariantId = variantIdInput.value;

  const currentVariant = variants.find((variant) => {
    return String(variant.id) === String(currentVariantId);
  });

  // Shopifyの商品設定
  // option[0] = Color
  // option[1] = Size
  let selectedColor = currentVariant?.options[0] ?? null;
  let selectedSize = currentVariant?.options[1] ?? null;

  // 初期選択
  sizeButtons.forEach((button) => {
    if (button.dataset.value === selectedSize) {
      button.classList.add("is-active");
    }
  });

  colorButtons.forEach((button) => {
    if (button.dataset.value === selectedColor) {
      button.classList.add("is-active");
    }
  });

  // 選択中のVariantを検索
  function updateVariant() {
    if (!selectedSize || !selectedColor) return;

    const variant = variants.find((variant) => {
      return (
        variant.options[0] === selectedColor &&
        variant.options[1] === selectedSize
      );
    });

    if (!variant) {
      console.log("Variant not found", {
        selectedSize,
        selectedColor,
      });

      return;
    }

    variantIdInput.value = variant.id;

    productPrice.textContent = `Dhs. ${(variant.price / 100).toFixed(2)}`;

    if (variant.available) {
      addToCartButton.disabled = false;
      addToCartButton.textContent = "Add to cart";
    } else {
      addToCartButton.disabled = true;
      addToCartButton.textContent = "Sold out";
    }
  }

  // Colorを基準にSizeの在庫状況を調べる
  function updateSizeAvailability() {
    if (!selectedColor) return;

    sizeButtons.forEach((button) => {
      const size = button.dataset.value;

      const variant = variants.find((variant) => {
        return (
          variant.options[0] === selectedColor && variant.options[1] === size
        );
      });

      console.log({
        selectedColor,
        size,
        variant,
      });

      if (variant?.available) {
        button.disabled = false;
        button.classList.remove("is-unavailable");
      } else {
        button.disabled = true;
        button.classList.add("is-unavailable");
      }
    });
  }

  // Sizeを基準にColorの在庫状況を調べる
  function updateColorAvailability() {
    colorButtons.forEach((button) => {
      const color = button.dataset.value;

      const variant = variants.find((variant) => {
        return (
          variant.options[0] === color && variant.options[1] === selectedSize
        );
      });

      if (variant && variant.available) {
        button.disabled = false;
        button.classList.remove("is-unavailable");
      } else {
        button.disabled = true;
        button.classList.add("is-unavailable");
      }
    });
  }

  function updateOptionAvailability() {
    updateSizeAvailability();
    // updateColorAvailability();
  }

  // Sizeボタン
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.value;

      sizeButtons.forEach((item) => {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");

      updateVariant();
      updateOptionAvailability();
    });
  });

  // Colorボタン
  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedColor = button.dataset.value;

      colorButtons.forEach((item) => {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");

      updateVariant();
      updateOptionAvailability();
    });
  });

  // ページを開いた時にも在庫状態を反映
  updateVariant();
  updateOptionAvailability();
}
