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
// 2. LOGIKA PENYIMPANAN DATA DINAMIS (Local Storage)
/**
 * Mengambil kontak dinamis yang tersimpan di Local Storage.
 * @returns {Array} Daftar kontak dinamis.
 */
function getDynamicContacts() {
    const stored = localStorage.getItem('userContacts');
    return stored ? JSON.parse(stored) : [];
}

/**
 * Ini hanya dijalankan jika ada elemen 'contact-form' (yaitu di add.html).
 */
function saveContact(event) {
    // Mencegah halaman reload
    event.preventDefault(); 
    
    // Ambil nilai dari input form
    const newContact = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        originCity: document.getElementById('originCity').value,
        message: document.getElementById('message').value,
        isStatic: false, 
        submittedAt: new Date().toLocaleString()
    };

    // Ambil data lama, tambahkan data baru
    let contacts = getDynamicContacts();
    contacts.push(newContact);

    // Simpan kembali ke Local Storage
    localStorage.setItem('userContacts', JSON.stringify(contacts));
    
    // Redirect ke halaman daftar kontak
    alert("Kontak berhasil disimpan!");
    window.location.href = 'list.html';
}
// 3. FUNGSI UTAMA UNTUK MENAMPILKAN KONTAK MENGGUNAKAN LOOP

window.displayStoredEntries = function() {
    // Ambil nilai pencarian dari input (sesuai id di list.html)
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    // 1. Gabungkan data statis dan dinamis
    const dynamicContacts = getDynamicContacts();
    let allContacts = [...staticContacts, ...dynamicContacts]; 

    // 2. Filter data (fitur pencarian)
    const filteredData = allContacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
               contact.email.toLowerCase().includes(searchTerm) ||
               contact.originCity.toLowerCase().includes(searchTerm);
    });

    // 3. Target elemen di list.html
    const container = document.getElementById('stored-data-list');
    let listHTML = '';
    
    // Jika tidak ada kontak yang ditemukan
    if (filteredData.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-600 mt-10">Tidak ada kontak yang ditemukan.</p>`;
        return;
    }

    // Buka wrapper GRID (sesuai kode HTML Anda)
    listHTML += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

    // 4. LOOP UNTUK MENAMPILKAN SETIAP KONTAK
    filteredData.forEach((data) => { 
        
        const isStatic = data.isStatic === true;
        
        // Action HTML (Tanpa tombol hapus, hanya info status)
        let actionHTML = isStatic ? `
            <button disabled class="mt-3 py-1 px-3 text-xs bg-gray-400 text-white rounded-md w-24 flex-none opacity-50 cursor-not-allowed">
                Data Statis
            </button>
        ` : `
            <span class="mt-3 py-1 px-3 text-xs text-blue-600 font-semibold w-24 flex-none">
                Data User
            </span>
        `;
        
        // Kontak Individual
        listHTML += `
            <div class="p-4 rounded-lg shadow-md border-t-4 ${isStatic ? 'border-custom-border' : 'border-red-400'} bg-custom-light-bg/80 flex flex-col justify-between">
                <div>
                    <p class="text-xs text-right text-gray-500">${isStatic ? 'Statis' : 'User'}</p> 
                    <p class="text-base font-bold text-custom-dark-text mb-1">Nama: ${data.name}</p>
                    <p class="text-sm text-gray-600">Email: ${data.email}</p>
                    <p class="text-sm text-gray-600">Telp: ${data.phone}</p>
                    <p class="text-sm font-semibold text-custom-dark-text mt-1">Kota: ${data.originCity}</p>
                    <p class="text-xs text-gray-700 italic mt-2">Pesan:</p>
                    <p class="text-sm text-custom-dark-text break-words">${data.message}</p>
                </div>
                ${actionHTML}
            </div>
        `;
    });

    listHTML += `</div>`;
    
    container.innerHTML = listHTML;
}

// 4. EKSEKUSI (Jalankan fungsi sesuai halaman)
document.addEventListener('DOMContentLoaded', () => {
    // Jika di list.html, tampilkan kontak
    if (document.getElementById('stored-data-list')) {
        displayStoredEntries();
    } 
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', saveContact);
    }
});

