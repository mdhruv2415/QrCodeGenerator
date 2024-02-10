const form = document.getElementById('Qr-form');
const qrcode = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearUI();
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    const cl = document.getElementById('colorL').value;
    const cd = document.getElementById('colorD').value;
    // console.log(url, size);
    if(url == "") {
        showAlerts('Please enter a URL');
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size, cl, cd);

            setTimeout(() => {
                const saveURL = qrcode.querySelector('img').src;
                createSaveBtn(saveURL);
            }, 50)
        }, 1000);
    }
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

const generateQRCode = (url, size, cl, cd) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
        colorDark: cl,
        colorLight: cd,
        // correctLevel: QRCode.CorrectLevel.h
    });
};
const showAlerts = (message)=> {
    if(document.getElementById('alert'))
    return;
    const div = document.createElement('div');
    div.id = "alert";
    div.className = "absolute -top-14 right-[45%] max-w-[50%]"
    div.innerHTML = `
            <div class="flex bg-red-100 border border-red-400 text-red-700 px-4 pt-3 rounded relative" role="alert">
                <strong class="font-bold">Invalid Input!</strong>
                <span class="">${message}.</span>
                <span class="px-4 pb-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>`;
    const container = document.getElementById('container');
    const alertbefore = document.getElementById('alertbefore');
    container.insertBefore(div, alertbefore);

    setTimeout(() => document.getElementById('alert').remove(), 1500);
}
const clearUI = () => {
    qrcode.innerHTML = "";
    const saveBtn = document.getElementById('save-link');
    if(saveBtn)
    saveBtn.remove();
};

const createSaveBtn = (saveURL) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold text-lg w-1/3 py-2 rounded m-auto my-5';
    link.href = saveURL;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated-qr').appendChild(link);
}
form.addEventListener('submit', onGenerateSubmit);
