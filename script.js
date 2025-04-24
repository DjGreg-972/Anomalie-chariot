
document.getElementById("scan-button").addEventListener("click", function () {
    const readerDiv = document.getElementById("reader");
    readerDiv.style.display = "block";

    const html5QrCode = new Html5Qrcode("reader");
    const qrConfig = { fps: 10, qrbox: 250 };

    html5QrCode.start(
        { facingMode: "environment" },
        qrConfig,
        (decodedText) => {
            document.getElementById("code").value = decodedText;
            html5QrCode.stop().then(() => {
                readerDiv.style.display = "none";
            }).catch(err => console.error("Stop failed", err));
        },
        (errorMessage) => {
            console.warn("QR error", errorMessage);
        }
    ).catch(err => {
        console.error("Start failed", err);
    });
});
