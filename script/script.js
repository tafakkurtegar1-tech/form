// KONFIGURASI LOCAL STORAGE

const STORAGE_KEY = 'formDataEntries';
const MAX_ENTRIES = 10; 

// FUNGSI NAVIGASI

/**
 * Fungsi untuk ke halaman daftar list.html.
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

    // Nilai input dari add.html
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



