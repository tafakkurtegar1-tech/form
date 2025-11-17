// KONFIGURASI LOCAL STORAGE

const STORAGE_KEY = 'formDataEntries';
const MAX_ENTRIES = 10; 

// FUNGSI NAVIGASI

/**
 * Fungsi untuk menavigasi pengguna ke halaman daftar (list.html).
 */
function goToListView() {
    window.location.href = 'list.html';
}

// FUNGSI UTAMA UNTUK MENGAMBIL DATA

function getStoredData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading localStorage:", e);
        return [];
    }
}

// FUNGSI SUBMIT  (CREATE/TAMBAH DATA)

function submitform(event) {
    event.preventDefault(); 

    // Nilai input dari index.html
    const nameInput = document.getElementById('name').value.trim(); 
    const emailInput = document.getElementById('email').value.trim();
    const telephoneInput = document.getElementById('telephone').value.trim();
    const originCityInput = document.getElementById('origin_city').value.trim();
    const messageInput = document.getElementById('message').value.trim();
    
    // VARIABEL UNTUK MELACAK STATUS VALIDASI
    let isValid = true; 

    // 1. Validasi Input menggunakan if else if
    
    if (nameInput === "") {
        alert("Peringatan: Nama harus diisi.");
        isValid = false; 
    } else if (emailInput === "") {
        alert("Peringatan: Email harus diisi.");
        isValid = false;
    } else if (telephoneInput === "") {
        alert("Peringatan: Telepon harus diisi.");
        isValid = false;
    } else if (originCityInput === "") {
        alert("Peringatan: Kota Asal harus diisi.");
        isValid = false;
    } else if (messageInput === "") {
        alert("Peringatan: Pesan harus diisi.");
        isValid = false;
    } 
    
    // PENGAMBILAN KEPUTUSAN YANG PENTING (IF ELSE)
    // Hanya jalankan jika penyimpanan adalah isValid adalah TRUE
    if (isValid === true) { 
        
        // 2. Objek Data Baru
        const newEntry = {
            name: nameInput,
            email: emailInput,
            telephone: telephoneInput,
            originCity: originCityInput,
            message: messageInput,
            submittedAt: new Date().toLocaleString('id-ID')
        };

        // 3. Ambil, Tambahkan, dan Batasi Data
        let storedData = getStoredData();
        storedData.unshift(newEntry);

        // Batasi data: Hapus entri terakhir jika sudah melebihi batas
        if (storedData.length > MAX_ENTRIES) {
            storedData.pop(); 
        }

        // Simpan yang sudah diperbarui kembali ke localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

        // 4. Feedback dan Reset Form
    
        document.getElementById('contacform').reset();
        
        // Memberikan respon sukses melalui alert
        alert(`Contact saved successfully! (${storedData.length}/${MAX_ENTRIES})`);
        
    } else {
        // Blok ini akan jalan jika isValid adalah FALSE.
    }
}

// FUNGSI HAPUS SATU per SAtu (DELETE)

/**
 * Fungsi untuk menghapus data berdasarkan index.
 */
function deleteEntry(index) {
    if (!confirm("Are you sure you want to delete this CONTACT #" + (index + 1) + "?")) {
        return; 
    }
    
    let storedData = getStoredData();

    // Hapus satu elemen pada index yang diberikan
    storedData.splice(index, 1); 

    // Simpan kembali data yang sudah diperbarui
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

    // Perbarui tampilan di list.html
    displayStoredEntries();
}

// FUNGSI HAPUS SEMUA DATA (CLEAR)

/**
 * Fungsi untuk menghapus semua kontak yang tersimpan di localStorage.
 */
function clearAllStoredData() {
    if (confirm("Are you sure you want to DELETE all saved CONTACTS?")) {
        localStorage.removeItem(STORAGE_KEY);
        alert("All saved contacts have been deleted!");
        displayStoredEntries(); 
    }
}

// FUNGSI MENAMPILKAN DATA (READ) 

/**
 * Fungsi untuk menampilkan daftar data yang tersimpan di localStorage
 */
function displayStoredEntries() {
    // Untuk ID di list.html
    const dataListDiv = document.getElementById('stored-data-list');
    const storedData = getStoredData();
    const totalEntries = storedData.length;
    
    if (!dataListDiv) return;

    // --- MULAI listHTML ---

    let listHTML = ''; 

    // 1. Display jumlah kontak.
    listHTML += `<div class="text-lg font-bold text-custom-dark-text mb-4 text-center">
                    Total Saved Contacts: (${totalEntries}/${MAX_ENTRIES})
                 </div>`;


    if (totalEntries === 0) {
        listHTML += `<p class="text-sm text-custom-dark-text mt-2 p-2 text-center">No Contact saved.</p>`;
        dataListDiv.innerHTML = listHTML; 
        return;
    }

    
    // 2. Wrapper GRID Responsif
    listHTML += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

    storedData.forEach((data, index) => {
    // KONTAK INDIVIDUAL
    listHTML += `
        <div class="p-4 rounded-lg shadow-md border-t-4 border-custom-border bg-white flex flex-col justify-between">
            <div>
                <p class="text-sm font-semibold text-custom-dark-text mb-2">#${index + 1} - ${data.submittedAt}</p>
                
                <p class="text-sm font-bold truncate">Name: ${data.name}</p>
                
                <p class="text-xs text-gray-600 truncate">Email: ${data.email}</p>

                
                <p class="text-xs text-gray-600 truncate mt-1">Telp: ${data.telephone}</p>
                
                <p class="text-xs text-gray-700 truncate font-semibold">Origin City: ${data.originCity}</p>

                <p class="text-xs text-gray-700 italic mt-2">Message:</p>
                <p class="text-sm text-custom-dark-text break-words">${data.message}</p>
            </div>
            
            <button onclick="deleteEntry(${index})"
                    class="mt-3 py-1 px-2 text-xs bg-red-500 text-white rounded-md hover:bg-red-900 transition-colors self-end w-20 flex-none">
                Delete
            </button>
        </div>
    `;
    });

    listHTML += `</div>`; // Tutup Grid
    
    // 3. Tombol Hapus Semua kontak 
    listHTML += `
        <div class="p-2.5 pt-6 flex justify-center"> 
            <button type="button" onclick="clearAllStoredData()"
                    class="py-2 px-4 bg-red-600 text-white border-none rounded-md cursor-pointer 
                           hover:bg-red-900 text-sm">
                  Delete All Contact (${totalEntries} Contact)
            </button>
        </div>
    `;

    // 4. Injeksi konten ke DOM
    dataListDiv.innerHTML = listHTML;
}

// INISIALISASI (Dijalankan saat halaman dimuat)

document.addEventListener('DOMContentLoaded', displayStoredEntries);