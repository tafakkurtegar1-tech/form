// 1. DATA KONTAK 
const contact = [
    {
        name: "Naruto Uzumaki",
        phone: "081234567890",
        email: "uzumaki@konoha.pg",
        originCity: "Konohagekure", 
        message: "Pahlawan Konoha,Jinchuriki Kyubi.",
        isStatic: true // Untuk identifikasi
    },
    {
        name: "Sasuke Uchiha",
        phone: "085678901234",
        email: "uchiha@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang pembunuh,The Last Uchiha",
        isStatic: true
    },
    {
        name: "Sakura Haruno",
        phone: "087890123456",
        email: "haruno@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sakura chan,Ninja medis.",
        isStatic: true
    },
    {
        name: "Kakashi Hatake",
        phone: "082234567812",
        email: "hatake@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Sharingan, Ninja Salin." ,
        isStatic: true
    },
    {
        name: "Gaara",
        phone: "085678345678",
        email: "gaara@sunagekure.pg",
        originCity: "Sunagakure (Desa Pasir)", 
        message: "Sang pembunuh,Jinchuriki Shukaku.",
        isStatic: true
    },
    {
        name: "Itachi Uchiha",
        phone: "0878923980764",
        email: "itachi@konoha.pg",
        originCity: "Konohagekure", 
        message: "Itachi Sang Pembunuh, Pahlawan Konoha.",
        isStatic: true
    },
    {
        name: "Orochimaru",
        phone: "081239087678",
        email: "maruorochi@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Ular, Mantan Sannin.",
        isStatic: true
    },
    {
        name: "Tsunade",
        phone: "085123456789",
        email: "tsunade@konoha.pg",
        originCity: "Konohagekure", 
        message: "TSunade sang legenda, hokage Kelima.",
        isStatic: true
    },
    {
        name: "Jiraiya",
        phone: "087345678901",
        email: "jiraiya@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Toad, Sannin.",
        isStatic: true
    },
    {
        name: "Minato Namikaze",
        phone: "081098765432",
        email: "namikaze@konoha.pg",
        originCity: "Konohagekure", 
        message: "Minato Sang Kilat, Hokage Keempat.",
        isStatic: true
    },
    {
        name: "Kisame Hoshigaki",
        phone: "085234567812",
        email: "hoshigaki@kirigakure.pg",
        originCity: "Kirigakure (desa Psair)", 
        message: "Kisame sang monster, Samehada",
        isStatic: true
    },
    {
        name: "Deidara",
        phone: "081234567890",
        email: "deidara@iwagakure.pg",
        originCity: "Iwagakure (Desa Batu)", 
        message: "Deidara sang seniman.",
        isStatic: true
    }
];
  function displayContacts() {
  for (let index = 0; index < contacts.length; index++) {
    const contact = contacts[index];
    console.log(contact);
  }
}

displayContacts(); 

