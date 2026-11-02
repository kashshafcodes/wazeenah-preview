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
      image: "https://scontent.fdac198-2.fna.fbcdn.net/v/t39.99422-6/869845336_1063824733331747_5319112736103042656_n.png?stp=dst-jpg_tt6&cstp=mx3273x4096&ctp=s3273x4096&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xwYF0ild0igQ7kNvwFOVpi9&_nc_oc=AdoMiLvlVwfEiYu3krJRRS72xuRd_tQg9JdCBi79ipeE-5cgAaGFeoUaYxA4C3moA1g&_nc_zt=14&_nc_ht=scontent.fdac198-2.fna&_nc_gid=yN1b0T9yxrWr1ya_J4fM0w&_nc_ss=792a8&oh=00_AQRGlJZxR6j1RzcoXHQNW-VoS86LJtsnyWJPrKB8tic7mg&oe=6AEEBF2A",
      sizes: ["24×36 in", "30×40 in", "Custom"],
      description: "Raised textured leaves with silver Arabic calligraphy across the top. Made to order.",
      tag: "New",
    },
    {
      id: "w2",
      name: "Moroccan Tile Calligraphy",
      category: "calligraphy",
      price: 9800,
      image: "https://scontent.fdac24-5.fna.fbcdn.net/v/t1.6435-9/117698741_150657150049622_918037010524977361_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1576&ctp=s2048x1576&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=f727a1&_nc_ohc=5LcpZRNvCN4Q7kNvwFHL2B6&_nc_oc=AdopXSBqoeTMBslwUrSLP3ZGJu3y9Gd77_mAavmFX34zQxjN_7SjWl3vvpDpMTTuFlQ&_nc_zt=23&_nc_ht=scontent.fdac24-5.fna&_nc_gid=NM2otRuLCaYDs_K_ICHQmA&_nc_ss=792a8&oh=00_AQSn20l3-7QSmVQt9zX8CeMFoitujRxcbPQdsOGJIw8pDA&oe=6B104730",
      sizes: ["24×24 in", "36×36 in", "Custom"],
      description: "Calligraphy set inside a hand-painted Moroccan tile pattern.",
      tag: "Bestseller",
    },
    {
      id: "w3",
      name: "Textured Floral Painting",
      category: "paintings",
      price: 6500,
      image: "https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-6/488997192_1111267471015439_888292755790663511_n.jpg?stp=dst-jpg_tt6&cstp=mx960x640&ctp=s960x640&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=f727a1&_nc_ohc=NprzeKyTIXkQ7kNvwH-RKBh&_nc_oc=AdpmcLcyk1Y_895SZQ-9_Ov7_RHY1zfYTwpPck1gJxijnaSKml8J93CWSS7U0g1PxNs&_nc_zt=23&_nc_ht=scontent.fdac24-2.fna&_nc_gid=xkbSQaVmYbwTQnTPiN5hWg&_nc_ss=792a8&oh=00_AQQyUdGTcLox5-YEVqg8r6kWfUKo_zhnWybZGHmuS8rN4g&oe=6AEE9A7A",
      sizes: ["16×20 in", "24×30 in"],
      description: "Thick palette-knife roses in soft pinks on a sage ground.",
    },
    {
      id: "w4",
      name: "Hand-painted Chest of Drawers",
      category: "furniture",
      price: 28000,
      image: "https://scontent.fdac198-2.fna.fbcdn.net/v/t39.30808-6/471161908_1118628023252525_7074558791209443953_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s1080x1080&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=f727a1&_nc_ohc=xWm4QzwH9vwQ7kNvwEzsOqY&_nc_oc=AdpwZBkKhxxoUfw_802pzvEF68x-oLdvKW54bpOPdUMCseVVkXGzk21wG8DeOY0p9ZQ&_nc_zt=23&_nc_ht=scontent.fdac198-2.fna&_nc_gid=GuXssJqblM_monMg08z2kA&_nc_ss=792a8&oh=00_AQSeKXXQb2oEmZJ1C4RY9GS0V-foU5Xcbb2OQEl3O2UPPQ&oe=6AEEC4F1",
      description: "Solid wood, five drawers, each hand-painted in a different colour and folk motif.",
      tag: "Made to order",
    },
    {
      id: "w5",
      name: "Framed Custom Nikkahnama",
      category: "nikkahnama",
      price: 7500,
      image: "https://scontent.fdac198-2.fna.fbcdn.net/v/t39.30808-6/490569240_1118810456927807_791305639613068761_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s960x960&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=f727a1&_nc_ohc=zYywNdqAJysQ7kNvwGdJ0ip&_nc_oc=Adp6fOHS390cd7j_WUcLicc3vraf249fsS7XdPOE0eK5oRchgas5b-7HRdbr0YXFpds&_nc_zt=23&_nc_ht=scontent.fdac198-2.fna&_nc_gid=WjI0hdYJ_wOU_kI6HY15Kg&_nc_ss=792a8&oh=00_AQTgYS5uXBNs-5iAjc2RbQKHF9Nob-5ReDbluNQ9_MAYSg&oe=6AEEB8F5",
      description: "Hand-lettered with the couple's names and wedding date, in a gold frame. Write the names in the note at checkout.",
    },
  ],
};
