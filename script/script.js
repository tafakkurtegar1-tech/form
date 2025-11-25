// 1. DATA KONTAK STATIS (DENGAN CITY & MESSAGE)
const contacts = [
    {
        name: "Naruto Uzumaki",
        phone: "081234567890",
        email: "uzumaki@konoha.pg",
        originCity: "Konohagekure", 
        message: "Pahlawan Konoha,Jinchuriki Kyubi." 
    },
    {
        name: "Sasuke Uchiha",
        phone: "085678901234",
        email: "uchiha@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang pembunuh,The Last Uchiha" 
    },
    {
        name: "Sakura Haruno",
        phone: "087890123456",
        email: "haruno@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sakura chan,Ninja medis."
    },
    {
        name: "Kakashi Hatake",
        phone: "082234567812",
        email: "hatake@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Sharingan, Ninja Salin." 
    },
    {
        name: "Gaara",
        phone: "085678345678",
        email: "gaara@sunagekure.pg",
        originCity: "Sunagakure (Desa Pasir)", 
        message: "Sang pembunuh,Jinchuriki Shukaku." 
    },
    {
        name: "Itachi Uchiha",
        phone: "0878923980764",
        email: "itachi@konoha.pg",
        originCity: "Konohagekure", 
        message: "Itachi Sang Pembunuh, Pahlawan Konoha."
    },
    {
        name: "Orochimaru",
        phone: "081239087678",
        email: "maruorochi@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Ular, Mantan Sannin." 
    },
    {
        name: "Tsunade",
        phone: "085123456789",
        email: "tsunade@konoha.pg",
        originCity: "Konohagekure", 
        message: "TSunade sang legenda, hokage Kelima." 
    },
    {
        name: "Jiraiya",
        phone: "087345678901",
        email: "jiraiya@konoha.pg",
        originCity: "Konohagekure", 
        message: "Sang Toad, Sannin."
    },
    {
        name: "Minato Namikaze",
        phone: "081098765432",
        email: "namikaze@konoha.pg",
        originCity: "Konohagekure", 
        message: "Minato Sang Kilat, Hokage Keempat." 
    },
    {
        name: "Kisame Hoshigaki",
        phone: "085234567812",
        email: "hoshigaki@kirigakure.pg",
        originCity: "Kirigakure (desa Psair)", 
        message: "Kisame sang monster, Samehada" 
    },
    {
        name: "Deidara",
        phone: "081234567890",
        email: "deidara@iwagakure.pg",
        originCity: "Iwagakure (Desa Batu)", 
        message: "Deidara sang seniman."
    }

];

// 2. FUNGSI TAMPILAN (RENDER MENGGUNAKAN LOOP)

function displayContacts() {
    const targetContainer = document.getElementById('stored-data-list');
    targetContainer.innerHTML = '';
    
    const contactList = document.createElement('ul'); 
    
    // Class untuk Grid Layout
    contactList.classList.add(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-6',          
        'list-none', 
        'p-0'
    );

    // Looping menggunakan forEach
    contacts.forEach(contact => {
        
        const listItem = document.createElement('li');
        // Styling Contact Card dengan Tailwind CSS
        listItem.classList.add(
            'p-5', 'bg-white/60', 'rounded-lg', 'shadow-lg', 'border', 'border-custom-border', 'flex', 'flex-col', 'gap-3' 
        );

        listItem.innerHTML = `
            <div class="flex justify-between items-start mb-3"> 
                <div>
                    <strong class="text-xl text-custom-dark-text">${contact.name}</strong> 
                    <p class="text-sm text-gray-500 italic mt-0.5">Asal: ${contact.originCity}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-custom-dark-text">
                <p><span class="font-semibold">Telepon:</span> <a href="tel:${contact.phone}">${contact.phone}</a></p>
                <p><span class="font-semibold">Email:</span> <a href="mailto:${contact.email}">${contact.email}</a></p>
            </div>
            
            <div class="mt-2 p-3 bg-custom-light-bg rounded-md border border-gray-300">
                <p class="text-xs font-semibold text-custom-dark-text mb-1">Pesan:</p>
                <p class="text-sm text-gray-800">${contact.message}</p>
            </div>
        `;

        contactList.appendChild(listItem);
    });

    targetContainer.appendChild(contactList);
}


document.addEventListener('DOMContentLoaded', displayContacts);
