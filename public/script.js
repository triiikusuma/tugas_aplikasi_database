document.getElementById('absensiForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const status = document.getElementById('status').value;

    const response = await fetch('http://localhost:3000/api/absensi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, kelas, status }),
    });

    if (response.ok) {
        document.getElementById('absensiForm').reset();
        loadAbsensi();
    }
});

async function loadAbsensi() {
    const response = await fetch('http://localhost:3000/api/absensi');
    const absensi = await response.json();

    const absensiList = document.getElementById('absensiList');
    absensiList.innerHTML = '';
    absensi.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nama} - ${item.kelas} - ${item.status}`;
        
        // Tambahkan tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = async () => {
            const deleteResponse = await fetch(`http://localhost:3000/api/absensi/${item.id}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                loadAbsensi();
            } else {
                console.error('Gagal menghapus data', deleteResponse);
            }
        };

        li.appendChild(deleteButton);
        absensiList.appendChild(li);
    });
}

loadAbsensi();
