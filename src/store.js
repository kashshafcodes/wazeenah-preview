// Preview for Wazeenah · The Craft Pantry (facebook.com/Wazeenah.thecraftpantry.bd)
// Product names and prices are SAMPLE values until the seller confirms real ones.

export const store = {
  theme: "premium",
  accent: "#2F5D50",
  name: "Wazeenah",
  nameLatin: "The Craft Pantry",
  tagline: "Handmade home décor, proudly made in Bangladesh.",
  about:
    "Textured Arabic calligraphy, hand-painted furniture, floral paintings and custom Nikkahnamas. Every piece is made by hand, and most can be made to your size, colours or names.",

  previewNote: "This is a demo. Product names and prices are samples and will be replaced with yours.",

  whatsapp: "8801600360783",
  messengerUsername: "Wazeenah.thecraftpantry.bd",
  facebookUrl: "https://www.facebook.com/Wazeenah.thecraftpantry.bd",
  phoneDisplay: "01600-360783",
  address: "Dhaka, Bangladesh",
  hours: "Orders taken every day",

  delivery: [
    { id: "dhaka", label: "Inside Dhaka", fee: 120, time: "2–3 days" },
    { id: "bd", label: "Outside Dhaka", fee: 250, time: "4–6 days" },
  ],
  payment: ["Cash on delivery", "bKash", "Bank transfer"],

  lang: "en",
  builtBy: "Kazi Marzuk",
  builtByUrl: "https://wa.me/8801891966267",

  categories: [
    { id: "calligraphy", label: "Arabic calligraphy" },
    { id: "paintings", label: "Paintings" },
    { id: "furniture", label: "Funn-itures" },
    { id: "nikkahnama", label: "Nikkahnama" },
  ],

  products: [
    {
      id: "w1",
      name: "Monstera Calligraphy Canvas",
      category: "calligraphy",
      price: 12500,
      image: "photos/w1.jpg",
      sizes: ["24×36 in", "30×40 in", "Custom"],
      description: "Raised textured leaves with silver Arabic calligraphy across the top. Made to order.",
      tag: "New",
    },
    {
      id: "w2",
      name: "Moroccan Tile Calligraphy",
      category: "calligraphy",
      price: 9800,
      image: "photos/w2.jpg",
      sizes: ["24×24 in", "36×36 in", "Custom"],
      description: "Calligraphy set inside a hand-painted Moroccan tile pattern.",
      tag: "Bestseller",
    },
    {
      id: "w3",
      name: "Textured Floral Painting",
      category: "paintings",
      price: 6500,
      image: "photos/w3.jpg",
      sizes: ["16×20 in", "24×30 in"],
      description: "Thick palette-knife roses in soft pinks on a sage ground.",
    },
    {
      id: "w4",
      name: "Hand-painted Chest of Drawers",
      category: "furniture",
      price: 28000,
      image: "photos/w4.jpg",
      description: "Solid wood, five drawers, each hand-painted in a different colour and folk motif.",
      tag: "Made to order",
    },
    {
      id: "w5",
      name: "Framed Custom Nikkahnama",
      category: "nikkahnama",
      price: 7500,
      image: "photos/w5.jpg",
      description: "Hand-lettered with the couple's names and wedding date, in a gold frame. Write the names in the note at checkout.",
    },
  ],
};
