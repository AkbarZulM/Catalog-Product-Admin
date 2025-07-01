const data = [
  {
    id: 1,
    name: "Enolge",
    price: 100,
    qty: 10,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "https://www.thespruceeats.com/thmb/5hHBlUXpulIrD4GqG4YDodYgQL8=/3865x2576/filters:fill(auto,1)/quaint-teacup-and-saucer-on-table-951629678-5bd8fa7246e0fb005132c72c.jpg",
  },
  {
    id: 2,
    name: "coffe latte",
    price: 200,
    qty: 5,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "https://th.bing.com/th/id/OIP.TDRRFBxg6mnYsnfLGLuXsAHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    name: "Machito",
    price: 150,
    qty: 8,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "https://cdn.pixabay.com/photo/2020/03/20/20/50/coffe-4951996_1280.jpg",
  },
];

class DummyProduct {
  static getAllProduct() {
    return data;
  }
}

export default DummyProduct;
