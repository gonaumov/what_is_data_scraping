
(() => {
    const data = Array.from(document.querySelectorAll('div.card.mb-3')).map((item) => {
        const name = item.querySelector("div.card-body div.ms-3 > h5").textContent;
        const description = item.querySelector("div.card-body div.ms-3 > p").textContent;
        const qty = item.querySelector("div.card-body h5.fw-normal.mb-0").textContent;
        const price = item.querySelector("div.card-body h5:not(.fw-normal).mb-0").textContent;
        return {
            name,
            description,
            qty,
            price
        }
    });


    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
    encodeURIComponent(JSON.stringify(data, null, ' ')));
    downloadLink.setAttribute('download', 'data.json');
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
})();