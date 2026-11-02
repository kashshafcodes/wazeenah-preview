const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function num(n, lang) {
  const s = Number(n).toLocaleString("en-IN");
  return lang === "bn" ? s.replace(/\d/g, (d) => BN_DIGITS[d]) : s;
}

export function taka(n, lang) {
  return `৳${num(n, lang)}`;
}

// Accepts 01XXXXXXXXX, +8801XXXXXXXXX, Bangla digits, spaces and dashes.
export function normalizePhone(raw) {
  const ascii = raw.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d))).replace(/[^\d]/g, "");
  const local = ascii.startsWith("880") ? ascii.slice(2) : ascii;
  return /^01[3-9]\d{8}$/.test(local) ? local : null;
}

export const TEXT = {
  bn: {
    browse: "পণ্য দেখুন",
    chat: "WhatsApp-এ কথা বলুন",
    all: "সব",
    search: "খুঁজুন",
    add: "ব্যাগে রাখুন",
    added: "ব্যাগে আছে",
    soldOut: "স্টক শেষ",
    bag: "ব্যাগ",
    emptyBag: "ব্যাগ খালি। পছন্দের পণ্য বেছে নিয়ে এখানে রাখুন।",
    noResults: "এই নামে কোনো পণ্য পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজুন।",
    size: "সাইজ",
    chooseSize: "আগে সাইজ বেছে নিন",
    qty: "পরিমাণ",
    remove: "বাদ দিন",
    subtotal: "পণ্যের দাম",
    deliveryFee: "ডেলিভারি চার্জ",
    total: "মোট",
    delivery: "ডেলিভারি",
    payment: "পেমেন্ট",
    yourName: "আপনার নাম",
    phone: "মোবাইল নম্বর",
    address: "পূর্ণ ঠিকানা",
    note: "বিশেষ কিছু জানাতে চাইলে (ঐচ্ছিক)",
    sendWhatsApp: "WhatsApp-এ অর্ডার পাঠান",
    sendMessenger: "Messenger-এ অর্ডার পাঠান",
    copied: "অর্ডারের লেখা কপি হয়েছে। Messenger-এ পেস্ট করে পাঠান।",
    copyManually: "নিচের লেখাটা কপি করে Messenger-এ পাঠান।",
    chatMessenger: "Messenger-এ কথা বলুন",
    errName: "নাম লিখুন",
    errPhone: "১১ সংখ্যার মোবাইল নম্বর লিখুন, যেমন ০১৭১২৩৪৫৬৭৮",
    errAddress: "ঠিকানা লিখুন যাতে ডেলিভারিম্যান খুঁজে পান",
    checkoutNote: "অর্ডার পাঠানোর পর আমরা ফোন করে কনফার্ম করব।",
    close: "বন্ধ করুন",
    contact: "যোগাযোগ",
    hours: "খোলা থাকে",
    builtBy: "ওয়েবসাইট তৈরি করেছেন",
    orderTitle: "নতুন অর্ডার",
  },
  en: {
    browse: "Browse products",
    chat: "Chat on WhatsApp",
    all: "All",
    search: "Search",
    add: "Add to bag",
    added: "In your bag",
    soldOut: "Sold out",
    bag: "Bag",
    emptyBag: "Your bag is empty. Pick something you like and it will show up here.",
    noResults: "No products match that search. Try a different word.",
    size: "Size",
    chooseSize: "Choose a size first",
    qty: "Quantity",
    remove: "Remove",
    subtotal: "Items",
    deliveryFee: "Delivery",
    total: "Total",
    delivery: "Delivery",
    payment: "Payment",
    yourName: "Your name",
    phone: "Mobile number",
    address: "Full address",
    note: "Anything else we should know (optional)",
    sendWhatsApp: "Send order on WhatsApp",
    sendMessenger: "Send order on Messenger",
    copied: "Order text copied. Paste it into Messenger and send.",
    copyManually: "Copy the text below and send it to us on Messenger.",
    chatMessenger: "Message us on Messenger",
    errName: "Enter your name",
    errPhone: "Enter an 11-digit mobile number, like 01712345678",
    errAddress: "Enter an address the rider can find",
    checkoutNote: "We'll call you to confirm after you send the order.",
    close: "Close",
    contact: "Contact",
    hours: "Open",
    builtBy: "Website by",
    orderTitle: "New order",
  },
};
