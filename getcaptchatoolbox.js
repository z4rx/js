(function() {
    const box = document.createElement("div");
    box.id = "captchaToolBox";
    box.style = `
        position: fixed;
        top: 80px;
        left: 40px;
        width: 260px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        z-index: 99999999;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        font-family: Arial, sans-serif;
    `;

    const header = document.createElement("div");
    header.innerText = "CAPTCHA TOOLBOX";
    header.style = `
        cursor: move;
        background: #007bff;
        color: white;
        padding: 6px;
        border-radius: 6px;
        text-align: center;
        font-weight: bold;
    `;
    box.appendChild(header);

    const content = document.createElement("div");
    content.style = "margin-top: 10px; font-size: 13px;";
    content.innerHTML = `
        <button id="checkCaptcha" style="width:100%; padding:6px; margin-top:5px;">Kiểm tra g-recaptcha-response</button>
        <button id="copyCaptcha" style="width:100%; padding:6px; margin-top:5px;">Copy g-recaptcha-response</button>

        <hr>

        <label>Thay thế response:</label>
        <input id="newResponse" placeholder="Nhập chuỗi..." 
            style="width: 100%; padding: 5px; margin-top: 5px;">

        <button id="replaceCaptcha" style="
            width: 100%; padding: 6px; margin-top: 5px;
            background: #28a745; color: white;
        ">Replace</button>

        <p id="status" style="font-size: 12px; color: green; margin-top: 5px;"></p>
    `;
    box.appendChild(content);
    document.body.appendChild(box);

    // DRAGGABLE
    let offsetX = 0, offsetY = 0, mouseDown = false;

    header.addEventListener("mousedown", (e) => {
        mouseDown = true;
        offsetX = e.clientX - box.offsetLeft;
        offsetY = e.clientY - box.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (mouseDown) {
            box.style.left = (e.clientX - offsetX) + "px";
            box.style.top = (e.clientY - offsetY) + "px";
        }
    });

    document.addEventListener("mouseup", () => mouseDown = false);

    // GET RESPONSE
    function getCaptchaResponse() {
        return document.querySelector('textarea[name="g-recaptcha-response"]')?.value || null;
    }

    document.getElementById("checkCaptcha").onclick = () => {
        let res = getCaptchaResponse();
        document.getElementById("status").innerText = res 
            ? "Response: " + res 
            : "Không tìm thấy g-recaptcha-response";
    };

    document.getElementById("copyCaptcha").onclick = () => {
        let res = getCaptchaResponse();
        if (!res) {
            document.getElementById("status").innerText = "Không có response";
            return;
        }
        navigator.clipboard.writeText(res);
        document.getElementById("status").innerText = "Đã copy!";
    };

    document.getElementById("replaceCaptcha").onclick = () => {
        let newValue = document.getElementById("newResponse").value.trim();
        let textarea = document.querySelector('textarea[name="g-recaptcha-response"]');

        if (!textarea) {
            document.getElementById("status").innerText = "Không tìm thấy textarea!";
            return;
        }
        if (!newValue) {
            document.getElementById("status").innerText = "Chưa nhập chuỗi để replace";
            return;
        }

        textarea.value = newValue;
        document.getElementById("status").innerText = "Đã thay thế!";
    };

})();
