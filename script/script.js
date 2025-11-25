// 1. DATA KONTAK STATIS 
const staticContacts = [
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
// 2. Wrapper GRID Responsif
    listHTML += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

    filteredData.forEach((data, index) => { // Loop menggunakan filteredData
        
        // Cek apakah data ini statis atau dinamis
        const isStatic = data.isStatic === true;
        
        // Tentukan HTML tombol Delete
        let deleteButtonHTML = `
            <button onclick="deleteEntry(${index})"
                    class="mt-3 py-1 px-2 text-xs bg-red-500 text-white rounded-md hover:bg-red-900 transition-colors self-end w-20 flex-none">
                Delete
            </button>
        `;
        
        // KONTAK INDIVIDUAL
        listHTML += `
            <div class="p-4 rounded-lg shadow-md border-t-4 ${isStatic ? 'border-blue-500' : 'border-custom-border'} bg-white flex flex-col justify-between">
                <div>
                    <p class="text-xs text-right text-gray-500">${isStatic ? 'Data Statis' : 'Data User'}</p> 

                    ${!isStatic ? `<p class="text-sm font-semibold text-custom-dark-text mb-2">Saved: ${data.submittedAt}</p>` : ''}
                    
                    <p class="text-sm font-bold truncate">Name: ${data.name}</p>
                    
                    <p class="text-xs text-gray-600 truncate">Email: ${data.email}</p>

                    <p class="text-xs text-gray-600 truncate mt-1">Telp: ${data.telephone || data.phone}</p>
                    
                    <p class="text-xs text-gray-700 truncate font-semibold">Origin City: ${data.originCity}</p>

                    <p class="text-xs text-gray-700 italic mt-2">Message:</p>
                    <p class="text-sm text-custom-dark-text break-words">${data.message}</p>
                </div>
                
                ${deleteButtonHTML}
            </div>
        `;
    });

    listHTML += `</div>`; // Tutup Grid
