// ==========================================================
// 1. DATA KONTAK STATIS & PENGATURANNYA
// ==========================================================

const staticContacts = [
    {
        id: "static-1", 
        name: "Naruto Uzumaki",
        phone: "081234567890",
        email: "uzumaki@konoha.pg",
        originCity: "Konohagekure",
        message: "Pahlawan Konoha, Jinchuriki Kyubi.",
        isStatic: true 
    },
    {
        id: "static-2",
        name: "Sasuke Uchiha",
        phone: "085678901234",
        email: "uchiha@konoha.pg",
        originCity: "Konohagekure",
        message: "Sang pembunuh, The Last Uchiha",
        isStatic: true
    },
    {
        id: "static-3",
        name: "Sakura Haruno",
        phone: "087890123456",
        email: "haruno@konoha.pg",
        originCity: "Konohagekure",
        message: "Sakura chan, Ninja medis.",
        isStatic: true
    },
    {
        id: "static-4",
        name: "Kakashi Hatake",
        phone: "082234567812",
        email: "hatake@konoha.pg",
        originCity: "Konohagekure",
        message: "Sang Sharingan, Ninja Salin.",
        isStatic: true
    },
    {
        id: "static-5",
        name: "Gaara",
        phone: "085678345678",
        email: "gaara@sunagekure.pg",
        originCity: "Sunagakure (Desa Pasir)",
        message: "Sang pembunuh, Jinchuriki Shukaku.",
        isStatic: true
    },
    {
        id: "static-6",
        name: "Itachi Uchiha",
        phone: "0878923980764",
        email: "itachi@konoha.pg",
        originCity: "Konohagekure",
        message: "Itachi Sang Pembunuh, Pahlawan Konoha.",
        isStatic: true
    },
    {
        id: "static-7",
        name: "Orochimaru",
        phone: "081239087678",
        email: "maruorochi@konoha.pg",
        originCity: "Konohagekure",
        message: "Sang Ular, Mantan Sannin.",
        isStatic: true
    },
    {
        id: "static-8",
        name: "Tsunade",
        phone: "085123456789",
        email: "tsunade@konoha.pg",
        originCity: "Konohagekure",
        message: "Tsunade sang legenda, hokage Kelima.",
        isStatic: true
    },
    {
        id: "static-9",
        name: "Jiraiya",
        phone: "087345678901",
        email: "jiraiya@konoha.pg",
        originCity: "Konohagekure",
        message: "Sang Toad, Sannin.",
        isStatic: true
    },
    {
        id: "static-10",
        name: "Minato Namikaze",
        phone: "081098765432",
        email: "namikaze@konoha.pg",
        originCity: "Konohagekure",
        message: "Minato Sang Kilat, Hokage Keempat.",
        isStatic: true
    },
    {
        id: "static-11",
        name: "Kisame Hoshigaki",
        phone: "085234567812",
        email: "hoshigaki@kirigakure.pg",
        originCity: "Kirigakure (desa Psair)",
        message: "Kisame sang monster, Samehada",
        isStatic: true
    },
    {
        id: "static-12",
        name: "Deidara",
        phone: "081234567890",
        email: "deidara@iwagakure.pg",
        originCity: "Iwagakure (Desa Batu)",
        message: "Deidara sang seniman.",
        isStatic: true
    }
];


// CONFIGURATION Local Storage
const STORAGE_KEY = 'formDataEntries'; // Dynamic (user-added) data
const DELETED_STATIC_KEY_V2 = 'deletedStaticContactsV2'; // ID statik yang di hapus (array)

// ==========================================================
// 2. FUNGSI INTI PENGAMBILAN DATA
// ==========================================================

/**
 * Mengambil data kontak yang ditambahkan pengguna (dinamis/edits) dari Local Storage.
 */
function getStoredData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Kesalahan membaca localStorage:", e);
        return [];
    }
}

/**
 * Mengambil daftar ID kontak statis yang sudah ditandai sebagai terhapus.
 */
function getDeletedStaticMarkers() {
    try {
        const stored = localStorage.getItem(DELETED_STATIC_KEY_V2);
        // Mengembalikan array ID: ["static-1", "static-5", ...]
        return stored ? JSON.parse(stored) : []; 
    } catch (e) {
        console.error("Kesalahan membaca data statis yang dihapus:", e);
        return [];
    }
}

/**
 * Memeriksa apakah sebuah kontak statis sudah ditandai sebagai terhapus (berdasarkan ID).
 */
function isStaticContactDeleted(contact, deletedMarkers) {
    // Memastikan kontak memiliki isStatic=true dan ID-nya ada di daftar penanda hapus
    return contact.isStatic && contact.id && deletedMarkers.includes(contact.id);
}

// ==========================================================
// 3. FUNGSI SUBMIT DI ADD.HTML
// ==========================================================

/**
 * Dipanggil dari add.html untuk menyimpan kontak baru.
 */
function submitform(event) {
    event.preventDefault();

    // Input values from add.html
    const nameInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const telephoneInput = document.getElementById('telephone').value.trim();
    const originCityInput = document.getElementById('origin_city').value.trim();
    const messageInput = document.getElementById('message').value.trim();

    let isValid = true;

    // 1. Input Validation
    if (nameInput === "" || emailInput === "" || telephoneInput === "" || originCityInput === "" || messageInput === "") {
        // Peringatan semua bidang harusdi isi
        alert("Peringatan: Semua bidang harus diisi.");
        isValid = false;
    }

    if (isValid === true) {

        // 2. New Data Object (mENGGUNAKAN submittedAt ID)
        const newEntry = {
            submittedAt: new Date().toLocaleString('id-ID'), 
            name: nameInput,
            email: emailInput,
            telephone: telephoneInput,
            originCity: originCityInput,
            message: messageInput,
            isStatic: false 
        };

        // 3. Mengambil and Add Data
        let storedData = getStoredData();

        storedData.unshift(newEntry);

        // Menyimpan data yang sudah di perwbaharui d localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

        // 4. Umpan balik and Reset form
        document.getElementById('contacform').reset();
        // Kontak berhasil di simpan
        alert(`Kontak berhasil disimpan! Total tersimpan: ${storedData.length}`);
    }
}

// ==========================================================
// 4. FUNGSI EDIT (edit.html)
// ==========================================================

/**
 * Mengarahkan dari list.html ke edit.html dengan membawa ID kontak.
 * Dipanggil oleh tombol "Edit" di list.html.
 */
function redirectToEdit(id) {
    window.location.href = `edit.html?id=${id}`;
}

/**
 * Memuat data kontak ke form di edit.html saat halaman dimuat.
 * Diperbarui untuk menangani Data Statis.
 */
function loadContactForEdit() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Jika bukan di edit.html atau ID tidak ada, hentikan
    if (!document.getElementById('edit-form') || !id) return;

    // 1. Dapatkan semua data (dinamis/edits dan statis)
    const storedData = getStoredData();
    const deletedMarkers = getDeletedStaticMarkers();

    // mENGGABUNGkan data statis yang belum dihapus
    const availableStaticData = staticContacts.filter(contact => 
        !isStaticContactDeleted(contact, deletedMarkers)
    );

    // Gabungkan data: Prioritaskan data dari Local Storage (storedData)
    // agar versi editan dari data statis yang disimpan di storedData digunakan, 
    
    const allData = [...storedData];
    
    // Tambahkan data statis yang tidak ada di storedData (belum diedit)
    availableStaticData.forEach(staticContact => {
        // Cek apakah data statis ini sudah ada versi editannya di storedData
        const isAlreadyEdited = storedData.some(data => data.id === staticContact.id);
        if (!isAlreadyEdited) {
            allData.push(staticContact);
        }
    });


    // 2. Cari kontak berdasarkan ID (ID bisa 'submittedAt' atau 'id' statis)
    const contact = allData.find(data => 
        (data.submittedAt === id) || (data.id === id)
    );

    if (contact) {
        // Isi form dengan data kontak
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('telephone').value = contact.telephone || contact.phone; // Ambil 'phone' jika 'telephone' tidak ada (untuk data statis)
        document.getElementById('origin_city').value = contact.originCity;
        document.getElementById('message').value = contact.message;
        
        // Simpan ID di form untuk digunakan saat penyimpanan
        document.getElementById('edit-form').setAttribute('data-contact-id', id);
        
        // Simpan status apakah data ini asalnya statis atau bukan
        document.getElementById('edit-form').setAttribute('data-is-static', contact.isStatic ? 'true' : 'false');
        
        // Perbarui judul di edit html
        document.querySelector('h2').textContent = `Edit Kontak: ${contact.name}`;

    } else {
        alert("Kontak tidak ditemukan. Kembali ke daftar.");
        window.location.href = 'list.html';
    }
}

/**
 * Menyimpan perubahan dari form edit.html ke Local Storage.
 * Dipanggil saat tombol "Simpan Perubahan" ditekan.
 * Diperbarui untuk menyimpan hasil edit data statis ke Local Storage.
 */
function saveEditedContact(event) {
    event.preventDefault();

    const form = document.getElementById('edit-form');
    const idToUpdate = form.getAttribute('data-contact-id');
    // Status asli kontak: jika true, artinya asalnya dari staticContacts
    const isStaticContact = form.getAttribute('data-is-static') === 'true'; 
    
    // 1. Ambil nilai baru
    const nameInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const telephoneInput = document.getElementById('telephone').value.trim();
    const originCityInput = document.getElementById('origin_city').value.trim();
    const messageInput = document.getElementById('message').value.trim();
    
    // 2. Validasi
    if (nameInput === "" || emailInput === "" || telephoneInput === "" || originCityInput === "" || messageInput === "") {
        alert("Peringatan: Semua bidang harus diisi.");
        return;
    }

    // 3. Simpan ke Local Storage
    let storedData = getStoredData();
    let index;
    let contactName;

    if (isStaticContact) {
        // CASE 1: Kontak yang diedit asalnya Statis (idToUpdate = 'static-X')
        
        // Cari apakah kontak statis ini SUDAH PERNAH DIEDIT sebelumnya di storedData
        index = storedData.findIndex(data => data.id === idToUpdate);
        
        contactName = nameInput;

        const updatedEntry = {
            id: idToUpdate, // Gunakan ID Statis yang sama ('static-1') sebagai kunci
            submittedAt: new Date().toLocaleString('id-ID'), // Perbarui stempel waktu
            name: nameInput,
            email: emailInput,
            telephone: telephoneInput,
            originCity: originCityInput,
            message: messageInput,
            isStatic: false // Statusnya menjadi 'dinamis' karena disimpan di Local Storage
        };

        if (index > -1) {
            // Jika sudah ada (sudah pernah diedit), timpa data lama di Local Storage
            storedData[index] = updatedEntry;
        } else {
            // Jika ini pertama kali diedit, tambahkan ke storedData
            storedData.unshift(updatedEntry);
        }
        
    } else {
        // CASE 2: Kontak yang diedit asalnya Dinamis (idToUpdate = submittedAt)
        
        index = storedData.findIndex(data => data.submittedAt === idToUpdate);
        contactName = nameInput;

        if (index > -1) {
            // Perbarui objek kontak yang sudah ada
            storedData[index].name = nameInput;
            storedData[index].email = emailInput;
            storedData[index].telephone = telephoneInput;
            storedData[index].originCity = originCityInput;
            storedData[index].message = messageInput;

        } else {
            alert("Kesalahan: Kontak dinamis tidak ditemukan untuk diperbarui.");
            return;
        }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    alert(`Kontak ${contactName} berhasil diperbarui!`);
    window.location.href = 'list.html'; // Kembali ke daftar
}

// ==========================================================
// 5. DELETE FUNCTION
// ==========================================================

/**
 * Terhapus atau di tandai sebagai kontak yang di hapus.
*/
function deleteEntry(idToDelete) {
    let storedData = getStoredData();
    let deletedMarkers = getDeletedStaticMarkers();

    // Tentukan apakah ID ini adalah ID Statis
    const isStaticID = idToDelete.startsWith('static-');

    // CONFIRMASI UNTUK MENGHAPUS KONTAK.
    if (!confirm(`Apakah Anda yakin ingin menghapus kontak ini?`)) {
        return;
    }
    
    if (isStaticID) {
        // kASUS 1: Data Statis ATAU Versi Editan Statis (idToDelete is "static-X")
        
        // Hapus versi editannya (jika ada) dari storedData
        const editedIndex = storedData.findIndex(data => data.id === idToDelete);
        if (editedIndex > -1) {
            storedData.splice(editedIndex, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
        }

        // Tandai versi Statis Asli sebagai terhapus
        if (!deletedMarkers.includes(idToDelete)) {
            deletedMarkers.push(idToDelete);
            localStorage.setItem(DELETED_STATIC_KEY_V2, JSON.stringify(deletedMarkers));
        }
        
        displayStoredEntries();

    } else {
        // kASUS 2: Dynamic Data (idToDelete is submittedAt)
        
        const originalIndex = storedData.findIndex(data =>
            data.submittedAt === idToDelete
        );

        if (originalIndex > -1) {
            storedData.splice(originalIndex, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
            displayStoredEntries();
        } else {
            // [ALERT] Dynamic contact not found
            alert("Kesalahan: Kontak dinamis tidak ditemukan dalam penyimpanan.");
        }
    }
}

/**
 * Menghapus semua data yang ditambahkan pengguna (dinamis) dan 
 * menandai semua data statis agar tidak ditampilkan.
 */
function clearAllStoredData() {
    const dynamicDataLength = getStoredData().length;

    const deletedMarkers = getDeletedStaticMarkers();
    const availableStaticDataLength = staticContacts.filter(contact =>
        !isStaticContactDeleted(contact, deletedMarkers)
    ).length;

    let totalToBeDeleted = dynamicDataLength + availableStaticDataLength;

    if (totalToBeDeleted === 0) {
        // cONFIR Tidak ada kontak yang di hapus
        alert("Tidak ada kontak yang tersedia untuk dihapus.");
        return;
    }

    // Confirm untuk hapus semua kontak
    if (!confirm(`Apakah Anda yakin ingin MENGHAPUS SEMUA KONTAK (${totalToBeDeleted} total, termasuk yang Statis)?`)) {
        return;
    }

    // 1. Delete semua kontak (termasuk kontak yang sudah di edit)
    localStorage.removeItem(STORAGE_KEY);

    // 2. Tanda semua data statis untuk di hapus
    const allStaticMarkers = staticContacts.map(contact => contact.id);
    localStorage.setItem(DELETED_STATIC_KEY_V2, JSON.stringify(allStaticMarkers));

    // Confrm semua data berhasil di hapus
    alert("Semua kontak (tambahan pengguna dan statis) telah berhasil dihapus!");
    displayStoredEntries();
}


// ==========================================================
// 6. DISPLAY FUNCTION (READ)
// ==========================================================

function displayStoredEntries() {
    const dataListDiv = document.getElementById('stored-data-list');

    // 1. Canak lalu dipisahkan datanya.
    const dynamicData = getStoredData();
    const deletedMarkers = getDeletedStaticMarkers();

    // Fungsi untuk memfilter data statis supaya tidak terhapus permanen.
    let availableStaticData = staticContacts.filter(contact => 
        !isStaticContactDeleted(contact, deletedMarkers)
    );

    // Filter data statis: Hapus data statis dari array ini jika sudah ada versi editannya di Local Storage (dynamicData)
    // Ini penting agar data statis hardcoded tidak muncul ganda bersamaan dengan versi editannya (hal yang membingungkan dan akhirnyabertanya ke AI)
    availableStaticData = availableStaticData.filter(staticContact => 
        !dynamicData.some(dynamic => dynamic.id === staticContact.id)
    );


    // 2. Untuk Pencarian (dibantu AI)
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Filtering fungsi
    const filterData = (dataArray) => {
        return dataArray.filter(data => {
            if (searchTerm === '') return true;

            const dataString =
                data.name.toLowerCase() + ' ' +
                data.email.toLowerCase() + ' ' +
                (data.telephone ? data.telephone.toLowerCase() : '') + ' ' +
                (data.phone ? data.phone.toLowerCase() : '') + ' ' +
                data.originCity.toLowerCase() + ' ' +
                data.message.toLowerCase();

            return dataString.includes(searchTerm);
        });
    };

    // Menerapkan filter di setiaop grup.
    const filteredStaticData = filterData(availableStaticData);
    const filteredDynamicData = filterData(dynamicData); // Termasuk versi edit statis

    // 3. Penggabungan data statis dulu baru yang dinamis (Versi editan statis berada di dalam filteredDynamicData)
    const filteredData = [...filteredStaticData, ...filteredDynamicData];
    
    const totalAvailableData = availableStaticData.length + dynamicData.length;
    const totalEntries = filteredData.length;

    if (!dataListDiv) return;

    let listHTML = '';

    listHTML += `<div class="text-lg font-bold text-custom-dark-text mb-4 text-center">
                    Kontak Yang Tersimpan: ${totalEntries}
                   </div>`;


    if (totalEntries === 0) {
        listHTML += `<p class="text-sm text-custom-dark-text mt-2 p-2 text-center">
                     ${searchTerm === '' ? 'Tidak ada kontak yang tersimpan.' : 'Tidak ada kontak ditemukan yang cocok dengan "' + searchTerm + '".'}
                     </p>`;

        if (totalAvailableData > 0) {
            listHTML += `
                <div class="p-2.5 pt-6 flex justify-center"> 
                    <button type="button" onclick="clearAllStoredData()"
                            class="py-2 px-4 bg-red-600 text-white border-none rounded-md cursor-pointer 
                                    hover:bg-red-900 text-sm">
                                    Hapus Semua Kontak
                    </button>
                </div>
            `;
        }
        dataListDiv.innerHTML = listHTML;
        return;
    }


    // 4. Responsive Grid Wrapper
    listHTML += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

    filteredData.forEach((data, index) => {

        const isStaticOriginal = data.isStatic === true; // memasukkan nilai data satatis
        // Data statis yang sudah diedit (di Local Storage) akan memiliki isStatic: false
        
        // Memakai ID untuk digunakan untuk edit/hapus
        const uniqueId = isStaticOriginal ? data.id : (data.id || data.submittedAt); 
        
        // Penanda tampilan: cek apakah ini data dari storedData (dinamis atau editan statis)
        const isUserManaged = !isStaticOriginal; 

        // Edit Button.
        let editButtonHTML = `
            <button onclick="redirectToEdit('${uniqueId}')"
                    class="mt-3 py-1 px-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors w-20 flex-none">
                Edit
            </button>
        `;

        // Delete Button
        let deleteButtonHTML = `
            <button onclick="deleteEntry('${uniqueId}')"
                    class="mt-3 py-1 px-2 text-xs bg-red-500 text-white rounded-md hover:bg-red-900 transition-colors w-20 flex-none">
                Hapus
            </button>
        `;

        // Tampilan kontak di list html (model grid)
        listHTML += `
            <div class="p-4 rounded-lg shadow-md border-t-4 ${isStaticOriginal ? 'border-blue-500' : 'border-custom-border'} bg-white flex flex-col justify-between contact-card">
                <div>
                    <p class="text-xs text-right text-gray-500">
                        ${isStaticOriginal ? 'Data Statis' : (data.id ? 'Statis (Versi Edit)' : 'Data Pengguna')}
                    </p> 

                    ${!isStaticOriginal ? `<p class="text-sm font-semibold text-custom-dark-text mb-2">Disimpan: ${data.submittedAt}</p>` : ''}
                    
                    <p class="text-sm font-bold truncate">Nama: ${data.name}</p>
                    
                    <p class="text-xs text-gray-600 truncate">Email: ${data.email}</p>

                    <p class="text-xs text-gray-600 truncate mt-1">Telp: ${data.telephone || data.phone}</p>
                    
                    <p class="text-xs text-gray-700 truncate font-semibold">Asal Kota: ${data.originCity}</p>

                    <p class="text-xs text-gray-700 italic mt-2">Pesan:</p>
                    <p class="text-sm text-custom-dark-text break-words">${data.message}</p>
                </div>
                
                <div class="flex gap-2 justify-end mt-3">
                    ${editButtonHTML}
                    ${deleteButtonHTML}
                </div>
            </div>
        `;
    });

    listHTML += `</div>`; // Close Grid

    // 5. Button hapus semua kontak
    if (totalEntries > 0) {
        listHTML += `
            <div class="p-2.5 pt-6 flex justify-center"> 
                <button type="button" onclick="clearAllStoredData()"
                        class="py-2 px-4 bg-red-600 text-white border-none rounded-md cursor-pointer 
                                hover:bg-red-900 text-sm">
                            Hapus Semua Kontak (${totalAvailableData} Total)
                </button>
            </div>
        `;
    }

    // 6. Memasukkan kontak ke DOM
    dataListDiv.innerHTML = listHTML;
}

// ==========================================================
// 7. INISIALISASI (Pemberian nilai untuk mencegah kesalahan)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Jalankan fungsi berdasarkan halaman yang aktif
    if (document.getElementById('stored-data-list')) {
        displayStoredEntries(); // Untuk list.html
        
        // Tambahkan event listener untuk fungsi pencarian
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', displayStoredEntries);
        }

    } else if (document.getElementById('edit-form')) {
        loadContactForEdit(); // Untuk edit.html
    }
});