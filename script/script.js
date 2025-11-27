// 1. DATA KONTAK 
const contacts = [
    {
        id: 1,
        name: "Naruto Uzumaki",
        phone: "081234567890",
        email: "uzumaki@konoha.pg",
        originCity: "Konohagekure", 
        message: "Pahlawan Konoha,Jinchuriki Kyubi.",
        
    },
    {
        id: 2,
        name: "Sasuke Uchiha",
        phone: "085678901234",
        email: "uchiha@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang pembunuh,The Last Uchiha",
        
    },
    {
        id: 3,
        name: "Sakura Haruno",
        phone: "087890123456",
        email: "haruno@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sakura chan,Ninja medis.",
    
    },
    {
        id: 4,
        name: "Kakashi Hatake",
        phone: "082234567812",
        email: "hatake@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Sharingan, Ninja Salin." ,
        
    },
    {
        id: 5,
        name: "Gaara",
        phone: "085678345678",
        email: "gaara@sunagekure.pg",
        originCity: "Sunagakure (Desa Pasir)", 
        message: "Sang pembunuh,Jinchuriki Shukaku.",
        
    },
    {
        id: 6,
        name: "Itachi Uchiha",
        phone: "0878923980764",
        email: "itachi@konoha.pg",
        originCity: "Konohagekure", 
        message: "Itachi Sang Pembunuh, Pahlawan Konoha.",
        
    },
    {
        id: 7,
        name: "Orochimaru",
        phone: "081239087678",
        email: "maruorochi@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Ular, Mantan Sannin.",
        
    },
    {
        id: 8,
        name: "Tsunade",
        phone: "085123456789",
        email: "tsunade@konoha.pg",
        originCity: "Konohagekure", 
        message: "TSunade sang legenda, hokage Kelima.",
        isStatic: true
    },
    {
        id: 9,
        name: "Jiraiya",
        phone: "087345678901",
        email: "jiraiya@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Toad, Sannin.",
        
    },
    {
        id: 10,
        name: "Minato Namikaze",
        phone: "081098765432",
        email: "namikaze@konoha.pg",
        originCity: "Konohagekure", 
        message: "Minato Sang Kilat, Hokage Keempat.",
        
    },
    {
        id: 11,
        name: "Kisame Hoshigaki",
        phone: "085234567812",
        email: "hoshigaki@kirigakure.pg",
        originCity: "Kirigakure (desa Psair)", 
        message: "Kisame sang monster, Samehada",
        
    },
    {
        id: 12,
        name: "Deidara",
        phone: "081234567890",
        email: "deidara@iwagakure.pg",
        originCity: "Iwagakure (Desa Batu)", 
        message: "Deidara sang seniman.",
        
    }
];
// Fungsi Loop.
  function displayContacts() {
    const container = document.getElementById('stored-data-list');
    
      container.innerHTML = ''; 
      contacts.forEach(contact => { 
         const contactDiv = document.createElement('div');
         contactDiv.innerHTML = `
            <h3>Nama: ${contact.name}</h3>
            <p>ID: ${contact.id}</p>
            <p>Telepon: ${contact.phone}</p>
            <p>Desa Asal: ${contact.originCity}</p>
            <p>Pesan: <i>${contact.message}</i></p>
            <hr style="margin: 10px 0;">
        `;
         container.appendChild(contactDiv);
    });
}



