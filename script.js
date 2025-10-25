document.addEventListener("DOMContentLoaded", () => {
  const pages = {
    home: `
        <section class="hero">
          <h1>Chào mừng đến với Hieu Auto</h1>
          <p>Showroom xe hơi cao cấp hàng đầu Việt Nam</p>
          <a href="#" data-page="cars" class="btn-primary">Khám phá ngay</a>
        </section>
      `,
    cars: `
        <section class="cars">
          <h2>Xe nổi bật</h2>
          <div class="car-list" id="car-list"></div>
        </section>
      `,
    about: `
        <section class="about">
          <h2>Giới thiệu</h2>
          <p>Hieu Auto là showroom chuyên cung cấp các dòng xe cao cấp nhập khẩu, cam kết chất lượng và dịch vụ tốt nhất cho khách hàng.</p>
        </section>
      `,
    contact: `
        <section class="contact">
          <h2>Liên hệ</h2>
          <p>📍 123 Đường Cao Tốc, TP.HCM</p>
          <p>📞 0909 888 999</p>
          <p>✉️ contact@hieuauto.vn</p>
        </section>
      `,
    cart: `
        <section class="cart">
          <h2>Giỏ hàng của bạn</h2>
          <div id="cart-items"></div>
          <div class="cart-total" id="cart-total"></div>
          <a href="#" id="checkout-btn" class="btn-checkout">Thanh toán</a>
        </section>
      `,
  };

  const cars = [
    {
      id: 1,
      name: "Mercedes G63 AMG",
      price: 8000000000,
      img: "https://tse3.mm.bing.net/th/id/OIP.wRimyqp1jg6CTPMmWP0czwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      name: "BMW X7",
      price: 5500000000,
      img: "https://tse1.mm.bing.net/th/id/OIP.lb4JQKYRsAEPKafY1CV6MwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      name: "Audi A8",
      price: 4800000000,
      img: "https://cdn.motor1.com/images/mgl/8QMwo/s1/2022-audi-a8-l.jpg",
    },
    {
      id: 4,
      name: "Range Rover Vogue",
      price: 7000000000,
      img: "https://tse3.mm.bing.net/th/id/OIP.I_V5Znmo_UiiFnemvitHOAHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  let cart = [];

  function render(page) {
    const content = document.getElementById("content");
    content.innerHTML = pages[page];
    document
      .querySelectorAll("nav a")
      .forEach((a) => a.classList.remove("active"));
    document.querySelector(`[data-page="${page}"]`)?.classList.add("active");

    if (page === "cars") renderCars();
    if (page === "cart") renderCart();
  }

  function renderCars() {
    const carList = document.getElementById("car-list");
    carList.innerHTML = cars
      .map(
        (car) => `
        <div class="car">
          <img src="${car.img}" alt="${car.name}" />
          <div class="info">
            <h3>${car.name}</h3>
            <p class="price">${car.price.toLocaleString()}₫</p>
            <button class="add-cart" onclick="addToCart(${
              car.id
            })">Thêm vào giỏ</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  window.addToCart = function (id) {
    const car = cars.find((c) => c.id === id);
    const item = cart.find((c) => c.id === id);
    if (item) item.qty++;
    else cart.push({ ...car, qty: 1 });
    updateCartCount();
  };

  function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.reduce(
      (sum, i) => sum + i.qty,
      0
    );
  }

  function renderCart() {
    const container = document.getElementById("cart-items");
    const totalBox = document.getElementById("cart-total");

    if (cart.length === 0) {
      container.innerHTML = "<p>Giỏ hàng trống.</p>";
      totalBox.textContent = "";
      return;
    }

    container.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <span>${item.name} x${item.qty}</span>
          <span>${(item.price * item.qty).toLocaleString()}₫</span>
        </div>`
      )
      .join("");

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    totalBox.textContent = "Tổng cộng: " + total.toLocaleString() + "₫";

    document.getElementById("checkout-btn").onclick = () => {
      alert("✅ Thanh toán thành công! Cảm ơn bạn đã mua xe tại Hieu Auto!");
      cart = [];
      updateCartCount();
      render("home");
    };
  }

  // ✅ Lắng nghe sự kiện click cho mọi phần tử có data-page (kể cả nút Khám phá ngay)
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("[data-page]");
    if (target) {
      e.preventDefault();
      render(target.dataset.page);
    }
  });

  render("home");
});
