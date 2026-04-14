import type { Product } from '@/types';

// ============================================
// IMÁGENES DE PERFUMES ÁRABES
// ============================================
const perfumeImages = {
  // AFNAN
  afnan9am: 'https://kimi-web-img.moonshot.cn/img/zacshop.com/432e1a4371122b29fe9bc995f27829ca55abb6b6.webp',
  afnan9amDive: 'https://kimi-web-img.moonshot.cn/img/www.myperfumeshop.be/fd5021b325684df83bad82c6e8c89e388be3b160.jpg',
  afnan9pm: 'https://kimi-web-img.moonshot.cn/img/img.fragrancex.com/c50d86478fc7de2c4a33915f19987a4b71d5c541.jpg',
  afnan9pmRebel: 'https://kimi-web-img.moonshot.cn/img/img.fragrancex.com/c50d86478fc7de2c4a33915f19987a4b71d5c541.jpg',
  
  // LATTAFA
  lattafaAsad: 'https://kimi-web-img.moonshot.cn/img/zaoud.it/c2a454f5769f8b7ff0c1bb46db41c4598f601090.jpg',
  lattafaAsadBourbon: 'https://kimi-web-img.moonshot.cn/img/dcf2bca4.delivery.rocketcdn.me/9b4470a8927459b6292f5af37db616e1e3d09ea9.jpg',
  lattafaYara: 'https://kimi-web-img.moonshot.cn/img/islandperfumebar.com/5be5787196c20c031bbbfa699ec6ae1b3487ec51.jpg',
  lattafaEclaire: 'https://kimi-web-img.moonshot.cn/img/cdn.deloox.com/59a2c2a773162027b3da52ebf67dcd3f605bb527.jpg',
  lattafaHaya: 'https://kimi-web-img.moonshot.cn/img/fimgs.net/cf5a2e41161214e4136ab4d0b4fd171ec9538af7.jpg',
  lattafaMayar: 'https://kimi-web-img.moonshot.cn/img/fimgs.net/fd09611317501cf74bc40fcceb7e2788434ec151.jpg',
  lattafaKhamrah: 'https://kimi-web-img.moonshot.cn/img/lamilas.com.au/a090ffeae0b019458aabd549f8f921067705ee3f.png',
  lattafaFakhar: 'https://kimi-web-img.moonshot.cn/img/www.rioperfumes.co.za/f5910481a0bcaac9a82e820206dd4a6407edb0b7.jpg',
  
  // RASASI
  rasasiHawas: 'https://kimi-web-img.moonshot.cn/img/cdn.deloox.com/2efe912ffa011a3bd38f7be06243993172c20f20.jpg',
  rasasiHawasIce: 'https://kimi-web-img.moonshot.cn/img/rasasistore.com/f716ea01dbcd49d8221b3e6110ca45a5074669af.jpg',
  
  // ARMAF
  armafClubDeNuit: 'https://kimi-web-img.moonshot.cn/img/armaf.com/efe208a1d31e6a0141bb02f527b6d97250a41a24.webp',
  armafOdyssey: 'https://kimi-web-img.moonshot.cn/img/armaf.com/409d501555450d22dac4519202ce1d04c48731f8.webp',
  
  // AL HARAMAIN
  alHaramainGold: 'https://kimi-web-img.moonshot.cn/img/ritzy.store/40e373c228bb66224a2503aa40c0017c60377cac.jpg',
  alHaramainAmber: 'https://kimi-web-img.moonshot.cn/img/shop.alharamainperfumes.com/704d53f48511e10da5cc3a36b41a34725e19dd6d.jpg',
  alHaramainCollection: 'https://kimi-web-img.moonshot.cn/img/ahp.alharamainperfumes.com/b4e8e416d77ea933fb33e6df9ae1225734960088.jpeg',
};

// ============================================
// IMÁGENES DE PRODUCTOS KARSELL
// ============================================
const karsellImages = {
  crema: 'https://kimi-web-img.moonshot.cn/img/www.karseell.com/f60d95f6e42b32e7e09eb64395f5a0dd23858775.webp',
  cremaVioleta: 'https://kimi-web-img.moonshot.cn/img/www.karseell.com/2662f8a6a718995f635f5960955863810355350c.jpg',
  oleo: 'https://kimi-web-img.moonshot.cn/img/www.karseell.com/4da282b281a6327d91f4284669e2858a590f63da.jpg',
  shampoo: 'https://kimi-web-img.moonshot.cn/img/www.karseell.com/21a804ee657aa101cb9a9bdeacbccc76a6833e85.webp',
  acondicionador: 'https://kimi-web-img.moonshot.cn/img/cdn.salla.sa/16d03e6ee003db650283d7a4d9fc8e7e7f1a8fa5.jpg',
  combo: 'https://kimi-web-img.moonshot.cn/img/www.karseell.com/f1167a430d22a367ad5ca61113807dcd61b3a843.webp',
};

// ============================================
// IMÁGENES DE VICTORIA'S SECRET BODY SPLASH
// ============================================
const vsImages = {
  amberRomance: 'https://kimi-web-img.moonshot.cn/img/cdn.deloox.com/53a6cd56047546a6a8dd5a7bc1bc67cbaa2fb9e3.jpg',
  aquaKiss: 'https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/feb3408dbe61b24dd7eb9d4471f806ac21acbf25.jpg',
  loveSpell: 'https://kimi-web-img.moonshot.cn/img/fimgs.net/f0ab9c8f30e00b12660f830a7f7520a6ae1ae27c.jpg',
  loveSpellCashmere: 'https://kimi-web-img.moonshot.cn/img/www.victoriassecretbeauty.co.th/92d5f5c8342973c32229a9114262583a8aef805b.jpg',
  midnightBloom: 'https://kimi-web-img.moonshot.cn/img/cdn.platform.next/4dd91a0fc8f006a85e8b77195f43358f64d061aa.jpg',
  pureSeduction: 'https://kimi-web-img.moonshot.cn/img/cdn.deloox.com/019d5e5966c2d6186ab607b64cccafd363ab08e2.jpg',
  pureSeductionCashmere: 'https://kimi-web-img.moonshot.cn/img/xcdn.next.co.uk/47e0def849e5ac8a1e6e866163798d454ce5c517.jpg',
  romantic: 'https://kimi-web-img.moonshot.cn/img/fimgs.net/1a2d28dd2e32a7cf4905cb7164a5457e87b2e8d5.jpg',
  rush: 'https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/7458cbefcdd3f6da5596cf7f65bb5e49211b9a25.jpg',
  velvetPetals: 'https://kimi-web-img.moonshot.cn/img/cdn.platform.next/ddeb629c78770500619c8b9fc7e63fad960fa872.jpg',
  coconutPassion: 'https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/feb3408dbe61b24dd7eb9d4471f806ac21acbf25.jpg',
  bareVanilla: 'https://kimi-web-img.moonshot.cn/img/cdn.platform.next/28ef5d9ffb88d15a139db19e66dd2c7efca50f78.jpg',
  bareVanillaShimmer: 'https://kimi-web-img.moonshot.cn/img/cdn.platform.next/28ef5d9ffb88d15a139db19e66dd2c7efca50f78.jpg',
};

// Imágenes genéricas de alta calidad
const genericPerfumeImages = [
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop',
];

const getRandomImage = (index: number) => genericPerfumeImages[index % genericPerfumeImages.length];

// ============================================
// PERFUMES ÁRABES
// ============================================
export const arabicPerfumes: Product[] = [
  // AFNAN COLLECTION
  { id: 1, name: '9AM', price: 74000, transferPrice: 59000, image: perfumeImages.afnan9am, stock: 5, installments: 3, installmentPrice: 24000 },
  { id: 2, name: '9AM DIVE', price: 74000, transferPrice: 59000, image: perfumeImages.afnan9amDive, stock: 5, installments: 3, installmentPrice: 24000 },
  { id: 3, name: '9PM', price: 66000, transferPrice: 53000, image: perfumeImages.afnan9pm, stock: 5, installments: 3, installmentPrice: 22000 },
  { id: 4, name: '9PM ELIXIR', price: 92000, transferPrice: 73000, image: perfumeImages.afnan9pm, stock: 3, installments: 3, installmentPrice: 30000 },
  { id: 5, name: '9PM NIGHT OUT', price: 126000, transferPrice: 101000, image: perfumeImages.afnan9pm, stock: 2, installments: 3, installmentPrice: 42000 },
  { id: 6, name: '9PM REBEL', price: 86000, transferPrice: 68000, image: perfumeImages.afnan9pmRebel, stock: 4, installments: 3, installmentPrice: 28000 },
  { id: 7, name: '9PM PURPLE', price: 80000, transferPrice: 64000, image: perfumeImages.afnan9pm, stock: 4, installments: 3, installmentPrice: 27000 },
  { id: 8, name: '9AM POUR FEMME', price: 75000, transferPrice: 60000, image: perfumeImages.afnan9am, stock: 5, installments: 3, installmentPrice: 25000 },
  { id: 9, name: 'AFNAN TUTRATHI ELECTRIC', price: 87000, transferPrice: 70000, image: getRandomImage(0), stock: 4, installments: 3, installmentPrice: 29000 },
  
  // ALHAMBRA
  { id: 10, name: 'ALAHAMBRA ROSE SEDUCTION', price: 58000, transferPrice: 47000, image: getRandomImage(1), stock: 6, installments: 3, installmentPrice: 20000 },
  { id: 11, name: 'ALHAMBRA VICTORIOSO', price: 50000, transferPrice: 40000, image: getRandomImage(2), stock: 7, installments: 3, installmentPrice: 16000 },
  
  // AL HARAMAIN
  { id: 12, name: 'AL HARAMAIN GOLD', price: 117000, transferPrice: 94000, image: perfumeImages.alHaramainGold, stock: 2, installments: 3, installmentPrice: 39000 },
  { id: 13, name: 'AL HARAMAIN DUBAI NIGHT', price: 105000, transferPrice: 84000, image: perfumeImages.alHaramainAmber, stock: 3, installments: 3, installmentPrice: 35000 },
  { id: 14, name: 'AL HARAMAIN AQUA DUBAI', price: 112000, transferPrice: 90000, image: perfumeImages.alHaramainCollection, stock: 2, installments: 3, installmentPrice: 38000 },
  
  // AL NOBLE
  { id: 15, name: 'AL NOBLE SAFEER', price: 58000, transferPrice: 47000, image: getRandomImage(3), stock: 6, installments: 3, installmentPrice: 20000 },
  { id: 16, name: 'AL NOBLE WAZZER', price: 64000, transferPrice: 52000, image: getRandomImage(0), stock: 5, installments: 3, installmentPrice: 21000 },
  { id: 17, name: 'AL NOBLE AMEER', price: 58000, transferPrice: 47000, image: getRandomImage(1), stock: 6, installments: 3, installmentPrice: 20000 },
  
  // AL OUD
  { id: 18, name: 'AL OUD NOBLE BLUSH', price: 69000, transferPrice: 55000, image: getRandomImage(2), stock: 5, installments: 3, installmentPrice: 23000 },
  { id: 19, name: 'AL WATANIAH ROSE MISTERY', price: 39000, transferPrice: 31000, image: getRandomImage(3), stock: 8, installments: 3, installmentPrice: 13000 },
  
  // AMERAT
  { id: 20, name: 'AMERAT PRIV RED', price: 38000, transferPrice: 30000, image: getRandomImage(0), stock: 10, installments: 3, installmentPrice: 12000 },
  { id: 21, name: 'AMERAT PRIV ROSE', price: 40000, transferPrice: 32000, image: getRandomImage(1), stock: 9, installments: 3, installmentPrice: 14000 },
  
  // AMETHYST
  { id: 22, name: 'AMETHYST', price: 56000, transferPrice: 44000, image: getRandomImage(2), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // ASAD
  { id: 23, name: 'ASAD', price: 75000, transferPrice: 60000, image: perfumeImages.lattafaAsad, stock: 5, installments: 3, installmentPrice: 25000 },
  { id: 24, name: 'ASAD ELIXIR', price: 82000, transferPrice: 66000, image: perfumeImages.lattafaAsad, stock: 4, installments: 3, installmentPrice: 27000 },
  { id: 25, name: 'ASAD BOURBON', price: 68000, transferPrice: 54000, image: perfumeImages.lattafaAsadBourbon, stock: 5, installments: 3, installmentPrice: 22000 },
  { id: 26, name: 'ASAD ZANZÍBAR LIMITED', price: 58000, transferPrice: 47000, image: perfumeImages.lattafaAsad, stock: 6, installments: 3, installmentPrice: 20000 },
  
  // BAD
  { id: 27, name: 'BAD FEMME', price: 54000, transferPrice: 43000, image: getRandomImage(3), stock: 6, installments: 3, installmentPrice: 18000 },
  { id: 28, name: 'BAD HOMME', price: 56000, transferPrice: 44000, image: getRandomImage(0), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // BADEE AL OUD
  { id: 29, name: 'BADEE AL OUD FOR GLORY', price: 51000, transferPrice: 41000, image: getRandomImage(1), stock: 7, installments: 3, installmentPrice: 17000 },
  
  // BHARARA
  { id: 30, name: 'BHARARA KING', price: 132000, transferPrice: 106000, image: getRandomImage(2), stock: 2, installments: 3, installmentPrice: 44000 },
  
  // CONFIDENTIAL
  { id: 31, name: 'CONFIDENTIAL GOLD', price: 46000, transferPrice: 37000, image: getRandomImage(3), stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 32, name: 'CONFIDENTIAL PLATINUM', price: 46000, transferPrice: 37000, image: getRandomImage(0), stock: 8, installments: 3, installmentPrice: 15000 },
  
  // CHANTS
  { id: 33, name: 'CHANTS TENDERINA', price: 52000, transferPrice: 42000, image: getRandomImage(1), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // CLUB DE NUIT
  { id: 34, name: 'CLUB DE NUIT MALEKA', price: 100000, transferPrice: 80000, image: perfumeImages.armafClubDeNuit, stock: 3, installments: 3, installmentPrice: 33000 },
  { id: 35, name: 'CLUB DE NUIT PRECIEUX', price: 111000, transferPrice: 89000, image: perfumeImages.armafClubDeNuit, stock: 2, installments: 3, installmentPrice: 37000 },
  { id: 36, name: 'CLUB DE NUIT UNTOLD', price: 100000, transferPrice: 80000, image: perfumeImages.armafClubDeNuit, stock: 3, installments: 3, installmentPrice: 33000 },
  { id: 37, name: 'CLUB DE NUIT URBAN ELIXIR', price: 84000, transferPrice: 67000, image: perfumeImages.armafClubDeNuit, stock: 4, installments: 3, installmentPrice: 28000 },
  { id: 38, name: 'CLUB DE NUIT WOMAN', price: 66000, transferPrice: 53000, image: perfumeImages.armafClubDeNuit, stock: 5, installments: 3, installmentPrice: 22000 },
  { id: 39, name: 'CLUB DE NUIT SILLAGE', price: 81000, transferPrice: 65000, image: perfumeImages.armafClubDeNuit, stock: 4, installments: 3, installmentPrice: 27000 },
  { id: 40, name: 'CLUB DE NUIT INTENSE', price: 76000, transferPrice: 61000, image: perfumeImages.armafClubDeNuit, stock: 4, installments: 3, installmentPrice: 26000 },
  
  // COCOA
  { id: 41, name: 'COCOA MORADO', price: 86000, transferPrice: 68000, image: getRandomImage(2), stock: 4, installments: 3, installmentPrice: 28000 },
  
  // EXQUISITE
  { id: 42, name: 'EXQUISITE', price: 40000, transferPrice: 32000, image: getRandomImage(3), stock: 9, installments: 3, installmentPrice: 14000 },
  
  // EMEER
  { id: 43, name: 'EMEER', price: 93000, transferPrice: 74000, image: getRandomImage(0), stock: 3, installments: 3, installmentPrice: 31000 },
  
  // ECLAIRE
  { id: 44, name: 'ECLAIRE', price: 60000, transferPrice: 48000, image: perfumeImages.lattafaEclaire, stock: 5, installments: 3, installmentPrice: 20000 },
  { id: 45, name: 'ECLAIRE BANOFFE', price: 86000, transferPrice: 68000, image: perfumeImages.lattafaEclaire, stock: 4, installments: 3, installmentPrice: 28000 },
  { id: 46, name: 'ECLAIRE PISTACHE', price: 86000, transferPrice: 68000, image: perfumeImages.lattafaEclaire, stock: 4, installments: 3, installmentPrice: 28000 },
  
  // EMAAN
  { id: 47, name: 'EMAAN', price: 56000, transferPrice: 44000, image: getRandomImage(1), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // FAKHAR
  { id: 48, name: 'FAKHAR GOLD', price: 56000, transferPrice: 44000, image: perfumeImages.lattafaFakhar, stock: 6, installments: 3, installmentPrice: 18000 },
  { id: 49, name: 'FAKHAR MAN SILVER', price: 74000, transferPrice: 59000, image: perfumeImages.lattafaFakhar, stock: 5, installments: 3, installmentPrice: 24000 },
  { id: 50, name: 'FAKHAR PLATIN', price: 51000, transferPrice: 41000, image: perfumeImages.lattafaFakhar, stock: 7, installments: 3, installmentPrice: 17000 },
  { id: 51, name: 'FAKHAR WOMAN', price: 66000, transferPrice: 53000, image: perfumeImages.lattafaFakhar, stock: 5, installments: 3, installmentPrice: 22000 },
  
  // GLACIAR
  { id: 52, name: 'GLACIAR POUR HOMME', price: 50000, transferPrice: 40000, image: getRandomImage(2), stock: 7, installments: 3, installmentPrice: 16000 },
  { id: 53, name: 'GLACIAR ULTRA', price: 57000, transferPrice: 46000, image: getRandomImage(3), stock: 6, installments: 3, installmentPrice: 19000 },
  { id: 54, name: 'GLACIAR BELLA', price: 48000, transferPrice: 38000, image: getRandomImage(0), stock: 7, installments: 3, installmentPrice: 16000 },
  
  // HAYA
  { id: 55, name: 'HAYA', price: 58000, transferPrice: 47000, image: perfumeImages.lattafaHaya, stock: 6, installments: 3, installmentPrice: 20000 },
  
  // HAYATTI
  { id: 56, name: 'HAYATTI GOLD ELIXIR', price: 42000, transferPrice: 34000, image: getRandomImage(1), stock: 8, installments: 3, installmentPrice: 14000 },
  { id: 57, name: 'HAYATTI FLORENCE', price: 45000, transferPrice: 36000, image: getRandomImage(2), stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 58, name: 'HAYYATTI MALEKY', price: 45000, transferPrice: 36000, image: getRandomImage(3), stock: 8, installments: 3, installmentPrice: 15000 },
  
  // CONFESSION
  { id: 59, name: 'HER CONFESSION', price: 75000, transferPrice: 60000, image: getRandomImage(0), stock: 5, installments: 3, installmentPrice: 25000 },
  { id: 60, name: 'HIS CONFESSION', price: 75000, transferPrice: 60000, image: getRandomImage(1), stock: 5, installments: 3, installmentPrice: 25000 },
  
  // HONOR AND GLORY
  { id: 61, name: 'HONOR AND GLORY', price: 54000, transferPrice: 43000, image: getRandomImage(2), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // ISHQ AL SHUYUKH
  { id: 62, name: 'ISHQ AL SHUYUKH GOLD', price: 60000, transferPrice: 48000, image: getRandomImage(3), stock: 5, installments: 3, installmentPrice: 20000 },
  
  // ISLAD
  { id: 63, name: 'ISLAD BLIZZ', price: 92000, transferPrice: 73000, image: getRandomImage(0), stock: 3, installments: 3, installmentPrice: 30000 },
  { id: 64, name: 'ISLAD BREZZE', price: 100000, transferPrice: 80000, image: getRandomImage(1), stock: 3, installments: 3, installmentPrice: 33000 },
  
  // JEAN LOVE
  { id: 65, name: 'JEAN LOVE INMORTAL', price: 64000, transferPrice: 52000, image: getRandomImage(2), stock: 5, installments: 3, installmentPrice: 21000 },
  
  // KHAMRAH
  { id: 66, name: 'KHAMRAH DUKHAN', price: 58000, transferPrice: 47000, image: perfumeImages.lattafaKhamrah, stock: 6, installments: 3, installmentPrice: 20000 },
  { id: 67, name: 'KHAMRAH QAHWA', price: 58000, transferPrice: 47000, image: perfumeImages.lattafaKhamrah, stock: 6, installments: 3, installmentPrice: 20000 },
  { id: 68, name: 'KHAMRAH UNISEX', price: 58000, transferPrice: 47000, image: perfumeImages.lattafaKhamrah, stock: 6, installments: 3, installmentPrice: 20000 },
  
  // KHANJAR
  { id: 69, name: 'KHANJAR', price: 99000, transferPrice: 79000, image: getRandomImage(3), stock: 3, installments: 3, installmentPrice: 33000 },
  
  // LA VOIE
  { id: 70, name: 'LA VOIE', price: 48000, transferPrice: 38000, image: getRandomImage(0), stock: 7, installments: 3, installmentPrice: 16000 },
  
  // LATTAFA NEBRAS
  { id: 71, name: 'LATTAFA NEBRAS', price: 78000, transferPrice: 62000, image: getRandomImage(1), stock: 4, installments: 3, installmentPrice: 26000 },
  
  // LIQUID BRUN
  { id: 72, name: 'LIQUID BRUN', price: 105000, transferPrice: 84000, image: getRandomImage(2), stock: 3, installments: 3, installmentPrice: 35000 },
  
  // MAAHIR
  { id: 73, name: 'MAAHIR BLACK', price: 68000, transferPrice: 54000, image: getRandomImage(3), stock: 5, installments: 3, installmentPrice: 22000 },
  { id: 74, name: 'MAAHIR EAU DE PARFUM', price: 68000, transferPrice: 54000, image: getRandomImage(0), stock: 5, installments: 3, installmentPrice: 22000 },
  { id: 75, name: 'MAAHIR LEGACY', price: 68000, transferPrice: 54000, image: getRandomImage(1), stock: 5, installments: 3, installmentPrice: 22000 },
  
  // MAYAR
  { id: 76, name: 'MAYAR CHERRY INTENSE', price: 51000, transferPrice: 41000, image: perfumeImages.lattafaMayar, stock: 7, installments: 3, installmentPrice: 17000 },
  { id: 77, name: 'MAYAR NATURAL INTENSE', price: 51000, transferPrice: 41000, image: perfumeImages.lattafaMayar, stock: 7, installments: 3, installmentPrice: 17000 },
  { id: 78, name: 'MAYAR PINK', price: 58000, transferPrice: 47000, image: perfumeImages.lattafaMayar, stock: 6, installments: 3, installmentPrice: 20000 },
  
  // ODYSSEY
  { id: 79, name: 'ODYSSEY CANDEE', price: 60000, transferPrice: 48000, image: perfumeImages.armafOdyssey, stock: 5, installments: 3, installmentPrice: 20000 },
  { id: 80, name: 'ODYSSEY CHOCOLATE DUBAI', price: 58000, transferPrice: 47000, image: perfumeImages.armafOdyssey, stock: 6, installments: 3, installmentPrice: 20000 },
  { id: 81, name: 'ODYSSEY REVOLUTION', price: 68000, transferPrice: 54000, image: perfumeImages.armafOdyssey, stock: 5, installments: 3, installmentPrice: 22000 },
  { id: 82, name: 'ODISSEY GO MANGO', price: 93000, transferPrice: 74000, image: perfumeImages.armafOdyssey, stock: 3, installments: 3, installmentPrice: 31000 },
  { id: 83, name: 'ODYSSEY LIMONI', price: 68000, transferPrice: 54000, image: perfumeImages.armafOdyssey, stock: 5, installments: 3, installmentPrice: 22000 },
  { id: 84, name: 'ODYSSEY TYRANT', price: 58000, transferPrice: 47000, image: perfumeImages.armafOdyssey, stock: 6, installments: 3, installmentPrice: 20000 },
  { id: 85, name: 'ODYSSEY AQUA', price: 81000, transferPrice: 65000, image: perfumeImages.armafOdyssey, stock: 4, installments: 3, installmentPrice: 27000 },
  { id: 86, name: 'ODYSSEY MANDARINE SKY', price: 69000, transferPrice: 55000, image: perfumeImages.armafOdyssey, stock: 5, installments: 3, installmentPrice: 23000 },
  { id: 87, name: 'MANDARINE SKY ELIXIR', price: 114000, transferPrice: 91000, image: perfumeImages.armafOdyssey, stock: 2, installments: 3, installmentPrice: 38000 },
  
  // PHILOS
  { id: 88, name: 'PHILOS CENTRO', price: 48000, transferPrice: 38000, image: getRandomImage(2), stock: 7, installments: 3, installmentPrice: 16000 },
  { id: 89, name: 'PHILOS OPTUS NOIR', price: 48000, transferPrice: 38000, image: getRandomImage(3), stock: 7, installments: 3, installmentPrice: 16000 },
  { id: 90, name: 'PHILOS ROSSO', price: 50000, transferPrice: 40000, image: getRandomImage(0), stock: 7, installments: 3, installmentPrice: 16000 },
  { id: 91, name: 'PHILOS PURA', price: 62000, transferPrice: 49000, image: getRandomImage(1), stock: 5, installments: 3, installmentPrice: 21000 },
  { id: 92, name: 'PHILOS SHINE', price: 45000, transferPrice: 36000, image: getRandomImage(2), stock: 8, installments: 3, installmentPrice: 15000 },
  
  // PRIDE PISA
  { id: 93, name: 'PRIDE PISA', price: 92000, transferPrice: 73000, image: getRandomImage(3), stock: 3, installments: 3, installmentPrice: 30000 },
  
  // QAED AL FURSAN
  { id: 94, name: 'QAED AL FURSAN BLANCO', price: 36000, transferPrice: 29000, image: getRandomImage(0), stock: 10, installments: 3, installmentPrice: 12000 },
  { id: 95, name: 'QAED AL FURSAN MARRÓN', price: 38000, transferPrice: 30000, image: getRandomImage(1), stock: 10, installments: 3, installmentPrice: 12000 },
  { id: 96, name: 'QAED AL FURSAN NEGRO', price: 45000, transferPrice: 36000, image: getRandomImage(2), stock: 8, installments: 3, installmentPrice: 15000 },
  
  // ROSE ORIGAMI
  { id: 97, name: 'ROSE ORIGAMI', price: 48000, transferPrice: 38000, image: getRandomImage(3), stock: 7, installments: 3, installmentPrice: 16000 },
  
  // RAYHAAN
  { id: 98, name: 'RAYHAAN ELIXIR', price: 75000, transferPrice: 60000, image: getRandomImage(0), stock: 5, installments: 3, installmentPrice: 25000 },
  
  // RASASI HAWAS
  { id: 99, name: 'RASASI HAWAS BLACK', price: 80000, transferPrice: 64000, image: perfumeImages.rasasiHawas, stock: 4, installments: 3, installmentPrice: 27000 },
  { id: 100, name: 'RASASI HAWAS TROPICAL', price: 93000, transferPrice: 74000, image: perfumeImages.rasasiHawas, stock: 3, installments: 3, installmentPrice: 31000 },
  { id: 101, name: 'RASASI HAWAS ELIXIR', price: 80000, transferPrice: 64000, image: perfumeImages.rasasiHawas, stock: 4, installments: 3, installmentPrice: 27000 },
  { id: 102, name: 'RASASI HAWAS FOR HIM', price: 63000, transferPrice: 50000, image: perfumeImages.rasasiHawas, stock: 5, installments: 3, installmentPrice: 21000 },
  { id: 103, name: 'RASASI HAWAS FOR HER', price: 56000, transferPrice: 44000, image: perfumeImages.rasasiHawas, stock: 6, installments: 3, installmentPrice: 18000 },
  { id: 104, name: 'RASASI HAWAS ICE', price: 99000, transferPrice: 79000, image: perfumeImages.rasasiHawasIce, stock: 3, installments: 3, installmentPrice: 33000 },
  
  // SABAH AL WARD
  { id: 105, name: 'SABAH AL WARD', price: 56000, transferPrice: 44000, image: getRandomImage(1), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // SAKEENA
  { id: 106, name: 'SAKEENA', price: 54000, transferPrice: 43000, image: getRandomImage(2), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // SALVO
  { id: 107, name: 'SALVO ELIXIR', price: 50000, transferPrice: 40000, image: getRandomImage(3), stock: 7, installments: 3, installmentPrice: 16000 },
  
  // SO CANDIDO
  { id: 108, name: 'SO CANDIDO FEM', price: 48000, transferPrice: 38000, image: getRandomImage(0), stock: 7, installments: 3, installmentPrice: 16000 },
  { id: 109, name: 'SO CANDIDO POUR HOMME', price: 50000, transferPrice: 40000, image: getRandomImage(1), stock: 7, installments: 3, installmentPrice: 16000 },
  
  // SUBLIME
  { id: 110, name: 'SUBLIME', price: 54000, transferPrice: 43000, image: getRandomImage(2), stock: 6, installments: 3, installmentPrice: 18000 },
  
  // SPECTRE
  { id: 111, name: 'SPECTRE GHOST', price: 86000, transferPrice: 68000, image: getRandomImage(3), stock: 4, installments: 3, installmentPrice: 28000 },
  { id: 112, name: 'SPECTRE BRONZITE', price: 48000, transferPrice: 38000, image: getRandomImage(0), stock: 7, installments: 3, installmentPrice: 16000 },
  
  // SUPREMACY
  { id: 113, name: 'SUPREMACY LEGACY', price: 68000, transferPrice: 54000, image: getRandomImage(1), stock: 5, installments: 3, installmentPrice: 22000 },
  
  // SEHR
  { id: 114, name: 'SEHR', price: 68000, transferPrice: 54000, image: getRandomImage(2), stock: 5, installments: 3, installmentPrice: 22000 },
  
  // SHAHEEN GOLD
  { id: 115, name: 'SHAHEEN GOLD', price: 58000, transferPrice: 47000, image: getRandomImage(3), stock: 6, installments: 3, installmentPrice: 20000 },
  
  // TERIAQ
  { id: 116, name: 'TERIAQ', price: 70000, transferPrice: 56000, image: getRandomImage(0), stock: 5, installments: 3, installmentPrice: 24000 },
  
  // TRES NUIT
  { id: 117, name: 'TRES NUIT', price: 58000, transferPrice: 47000, image: getRandomImage(1), stock: 6, installments: 3, installmentPrice: 20000 },
  
  // THE KINGDOM
  { id: 118, name: 'THE KINGDOM FEM', price: 58000, transferPrice: 47000, image: getRandomImage(2), stock: 6, installments: 3, installmentPrice: 20000 },
  { id: 119, name: 'THE KINGDOM MASC', price: 64000, transferPrice: 52000, image: getRandomImage(3), stock: 5, installments: 3, installmentPrice: 21000 },
  
  // VICTORIA
  { id: 120, name: 'VICTORIA', price: 64000, transferPrice: 52000, image: getRandomImage(0), stock: 5, installments: 3, installmentPrice: 21000 },
  
  // VICTORIOSO
  { id: 121, name: 'VICTORIOSO FEARL', price: 42000, transferPrice: 34000, image: getRandomImage(1), stock: 8, installments: 3, installmentPrice: 14000 },
  { id: 122, name: 'VICTORIOSO HEROI', price: 42000, transferPrice: 34000, image: getRandomImage(2), stock: 8, installments: 3, installmentPrice: 14000 },
  { id: 123, name: 'VICTORIOSO LEGAC', price: 42000, transferPrice: 34000, image: getRandomImage(3), stock: 8, installments: 3, installmentPrice: 14000 },
  
  // VULCAN AVENUE
  { id: 124, name: 'VULCAN AVENUE', price: 108000, transferPrice: 86000, image: getRandomImage(0), stock: 3, installments: 3, installmentPrice: 36000 },
  
  // YARA
  { id: 125, name: 'YARA CANDY', price: 57000, transferPrice: 46000, image: perfumeImages.lattafaYara, stock: 6, installments: 3, installmentPrice: 19000 },
  { id: 126, name: 'YARA MOI', price: 51000, transferPrice: 41000, image: perfumeImages.lattafaYara, stock: 7, installments: 3, installmentPrice: 17000 },
  { id: 127, name: 'YARA PINK', price: 57000, transferPrice: 46000, image: perfumeImages.lattafaYara, stock: 6, installments: 3, installmentPrice: 19000 },
  { id: 128, name: 'YARA TOUS', price: 51000, transferPrice: 41000, image: perfumeImages.lattafaYara, stock: 7, installments: 3, installmentPrice: 17000 },
  { id: 129, name: 'YARA ELIXIR', price: 76000, transferPrice: 61000, image: perfumeImages.lattafaYara, stock: 4, installments: 3, installmentPrice: 26000 },
  
  // YUM YUM
  { id: 130, name: 'YUM YUM', price: 96000, transferPrice: 77000, image: getRandomImage(1), stock: 3, installments: 3, installmentPrice: 32000 },
  
  // ZIMAYA
  { id: 131, name: 'ZIMAYA FÁTIMA PINK', price: 62000, transferPrice: 49000, image: getRandomImage(2), stock: 5, installments: 3, installmentPrice: 21000 },
  { id: 132, name: 'ZIMAYA TIRAMISU CARAMEL', price: 76000, transferPrice: 61000, image: getRandomImage(3), stock: 4, installments: 3, installmentPrice: 26000 },
  { id: 133, name: 'ZIMAYA TIRAMISU COCO', price: 76000, transferPrice: 61000, image: getRandomImage(0), stock: 4, installments: 3, installmentPrice: 26000 },
  { id: 134, name: 'ZIMAYA VELVENT LOVE PURPLE', price: 58000, transferPrice: 47000, image: getRandomImage(1), stock: 6, installments: 3, installmentPrice: 20000 },
];

// ============================================
// PRODUCTOS KARSELL
// ============================================
export const karsellProducts: Product[] = [
  { id: 201, name: 'Cremas Karsell', price: 35000, transferPrice: 28000, image: karsellImages.crema, stock: 10, installments: 3, installmentPrice: 11667 },
  { id: 202, name: 'Crema Karsell Violeta', price: 35000, transferPrice: 28000, image: karsellImages.cremaVioleta, stock: 10, installments: 3, installmentPrice: 11667 },
  { id: 203, name: 'Óleo Karsell', price: 25000, transferPrice: 20000, image: karsellImages.oleo, stock: 15, installments: 3, installmentPrice: 8333 },
  { id: 204, name: 'Crema Karsell + Óleo', price: 55000, transferPrice: 44000, image: karsellImages.combo, stock: 8, installments: 3, installmentPrice: 18333 },
  { id: 205, name: 'Shampoo Karsell', price: 25000, transferPrice: 20000, image: karsellImages.shampoo, stock: 15, installments: 3, installmentPrice: 8333 },
  { id: 206, name: 'Crema de Enjuague Karsell', price: 25000, transferPrice: 20000, image: karsellImages.acondicionador, stock: 15, installments: 3, installmentPrice: 8333 },
];

// ============================================
// BODY SPLASH VICTORIA'S SECRET - SIN SHIMMER
// ============================================
export const vsBodySplashNoShimmer: Product[] = [
  { id: 301, name: 'Ámbar Romance', price: 45000, transferPrice: 36000, image: vsImages.amberRomance, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 302, name: 'Aqua Kiss', price: 45000, transferPrice: 36000, image: vsImages.aquaKiss, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 303, name: 'Love Spell', price: 45000, transferPrice: 36000, image: vsImages.loveSpell, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 304, name: 'Love Spell Cashmere', price: 45000, transferPrice: 36000, image: vsImages.loveSpellCashmere, stock: 6, installments: 3, installmentPrice: 15000 },
  { id: 305, name: 'Midnight Bloom', price: 45000, transferPrice: 36000, image: vsImages.midnightBloom, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 306, name: 'Pure Seduction Cashmere', price: 45000, transferPrice: 36000, image: vsImages.pureSeductionCashmere, stock: 6, installments: 3, installmentPrice: 15000 },
  { id: 307, name: 'Romantic', price: 45000, transferPrice: 36000, image: vsImages.romantic, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 308, name: 'Rush', price: 45000, transferPrice: 36000, image: vsImages.rush, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 309, name: 'Velvet Petals', price: 45000, transferPrice: 36000, image: vsImages.velvetPetals, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 310, name: 'Coconut Passion', price: 45000, transferPrice: 36000, image: vsImages.coconutPassion, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 311, name: 'Bare Vanilla', price: 45000, transferPrice: 36000, image: vsImages.bareVanilla, stock: 8, installments: 3, installmentPrice: 15000 },
  { id: 312, name: 'Pure Seduction', price: 45000, transferPrice: 36000, image: vsImages.pureSeduction, stock: 8, installments: 3, installmentPrice: 15000 },
];

// ============================================
// BODY SPLASH VICTORIA'S SECRET - CON SHIMMER
// ============================================
export const vsBodySplashShimmer: Product[] = [
  { id: 401, name: 'Coconut Passion (Shimmer)', price: 46000, transferPrice: 36800, image: vsImages.coconutPassion, stock: 6, installments: 3, installmentPrice: 15333 },
  { id: 402, name: 'Bare Vanilla (Shimmer)', price: 46000, transferPrice: 36800, image: vsImages.bareVanillaShimmer, stock: 6, installments: 3, installmentPrice: 15333 },
  { id: 403, name: 'Aqua Kiss (Shimmer)', price: 46000, transferPrice: 36800, image: vsImages.aquaKiss, stock: 6, installments: 3, installmentPrice: 15333 },
  { id: 404, name: 'Love Spell (Shimmer)', price: 46000, transferPrice: 36800, image: vsImages.loveSpell, stock: 6, installments: 3, installmentPrice: 15333 },
  { id: 405, name: 'Pure Seduction (Shimmer)', price: 46000, transferPrice: 36800, image: vsImages.pureSeduction, stock: 6, installments: 3, installmentPrice: 15333 },
];

// ============================================
// TODOS LOS PRODUCTOS
// ============================================
export const allProducts: Product[] = [
  ...arabicPerfumes,
  ...karsellProducts,
  ...vsBodySplashNoShimmer,
  ...vsBodySplashShimmer,
];

// Productos destacados (primeros 16 perfumes árabes)
export const featuredProducts = arabicPerfumes.slice(0, 16);
