const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Phone",
    price: 1199,
    description: "Apple iPhone 15 Pro Max with A17 Pro chip and 256GB storage.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.aKPGP2PTXS4XwucckNT0CwHaFU?w=5796&h=4160&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    category: "Phone",
    price: 1099,
    description:
      "Samsung Galaxy S23 Ultra with Snapdragon 8 Gen 2 and 200MP camera.",
    image:
      "https://img.tuttoandroid.net/wp-content/uploads/2023/02/samsung_galaxy_s23_ultra_tta_31.jpg",
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    category: "Phone",
    price: 999,
    description:
      "Google Pixel 8 Pro with Tensor G3 processor and 6.7-inch OLED display.",
    image:
      "https://www.digitaltrends.com/wp-content/uploads/2023/10/google-pixel-8-pro-colorful-background-close.jpeg?p=1",
  },
  {
    id: 4,
    name: "MacBook Pro 16-inch",
    category: "Laptop",
    price: 2499,
    description: "Apple MacBook Pro 16-inch with M3 Pro chip and 1TB SSD.",
    image:
      "https://sm.pcmag.com/t/pcmag_au/review/a/apple-macb/apple-macbook-pro-16-inch_461p.1280.jpg",
  },
  {
    id: 5,
    name: "Dell XPS 15",
    category: "Laptop",
    price: 1799,
    description: "Dell XPS 15 with Intel i7 13th Gen and NVIDIA RTX 4060.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.3WakglSsotHje4iHmToQDAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 6,
    name: "Asus ROG Zephyrus G14",
    category: "Laptop",
    price: 1599,
    description:
      "Asus ROG Zephyrus G14 gaming laptop with Ryzen 9 and RTX 4070.",
    image:
      "https://th.bing.com/th/id/R.35c4730e747576dee8fd6886e4b93646?rik=cOzzQJ4hzrPL4Q&riu=http%3a%2f%2fblog.onsitego.com%2fwp-content%2fuploads%2f2020%2f09%2fASUS-ROG-Zephyrus-G14-Review.jpg&ehk=0pLa1iu63RmxroscSa3wuyN9jbuOBQueOafag7JFUho%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 7,
    name: "LG UltraGear 27GN950",
    category: "Monitor",
    price: 699,
    description: "LG UltraGear 27-inch 4K UHD Nano IPS 144Hz gaming monitor.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.whBmfelvYBkLtgz3f2rmHwHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 8,
    name: "Samsung Odyssey G9",
    category: "Monitor",
    price: 1299,
    description: "Samsung Odyssey G9 49-inch curved QLED gaming monitor.",
    image:
      "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Odyssey_G9_4.jpg",
  },
  {
    id: 9,
    name: "Dell UltraSharp U2723QE",
    category: "Monitor",
    price: 649,
    description: "Dell UltraSharp 27-inch 4K UHD monitor with IPS Black panel.",
    image:
      "https://th.bing.com/th/id/R.f56da65c5b49723eb758d78c98cb0e0b?rik=3EK08M8y8%2bwwPA&pid=ImgRaw&r=0",
  },
  {
    id: 10,
    name: "OnePlus 11",
    category: "Phone",
    price: 749,
    description: "OnePlus 11 with Snapdragon 8 Gen 2 and 100W fast charging.",
    image:
      "https://www.oneplus.com/content/dam/oasis/page/2023/global/home/salami-share.jpg",
  },
  {
    id: 11,
    name: "HP Spectre x360",
    category: "Laptop",
    price: 1499,
    description: "HP Spectre x360 convertible laptop with Intel i7 12th Gen.",
    image: "https://i.ytimg.com/vi/1QqQ0aZD2Nk/maxresdefault.jpg",
  },
  {
    id: 12,
    name: "Acer Predator X34",
    category: "Monitor",
    price: 999,
    description:
      "Acer Predator X34 curved gaming monitor with 144Hz refresh rate.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.MPnNqXmcQmIxTg3qkilHdwHaFl?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 13,
    name: "Sony Xperia 1 V",
    category: "Phone",
    price: 1199,
    description:
      "Sony Xperia 1 V with 4K OLED display and advanced camera system.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.cRcBGy4dCR6gO7OHHSzz3AHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 14,
    name: "Lenovo Legion 5 Pro",
    category: "Laptop",
    price: 1399,
    description: "Lenovo Legion 5 Pro gaming laptop with Ryzen 7 and RTX 3060.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.VGJXrxB7BjQMXLB8tH2JawHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 15,
    name: "MSI Optix MAG274QRF-QD",
    category: "Monitor",
    price: 499,
    description:
      "MSI Optix 27-inch QHD gaming monitor with Quantum Dot technology.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.3yljl2iEkFqKaZ1-3NJGYgHaDs?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

export default products;
