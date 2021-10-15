
export function formatMoneyOne(angka, prefix) {
    var number_string = angka.toString().replace(/[^,\d]/g, ""),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    let separator;

    if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

export function formatMoneyMany(data) {
    data = data.map(item => {
        let temp = item;

        temp = { ...temp, harga: formatMoneyOne(temp.harga) }

        return temp;
    });

    return data;
}