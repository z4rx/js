(function() {
    // =========================================
    // TOOLBOX 1: CAPTCHA TOOLBOX
    // =========================================
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
    header.id = "toolHeader";
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

    // DRAGGABLE cho box 1
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

    // =========================================
    // TOOLBOX 2: GOOGLE REFER HELPER
    // =========================================
    const box2 = document.createElement("div");
    box2.id = "googleReferToolBox";
    box2.style = `
        position: fixed;
        top: 80px;
        right: 40px;
        width: 280px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        z-index: 99999999;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        font-family: Arial, sans-serif;
    `;

    const header2 = document.createElement("div");
    header2.id = "toolHeader2";
    header2.innerText = "GOOGLE REFER HELPER";
    header2.style = `
        cursor: move;
        background: #343a40;
        color: white;
        padding: 6px;
        border-radius: 6px;
        text-align: center;
        font-weight: bold;
        font-size: 13px;
    `;
    box2.appendChild(header2);

    const content2 = document.createElement("div");
    content2.style = "margin-top: 10px; font-size: 13px;";
    content2.innerHTML = `
        <label>URL đích:</label>
        <input id="refTargetUrl" placeholder="https://example.com" 
            style="width: 100%; padding: 5px; margin: 5px 0;">

        <label>Từ khóa Google Search:</label>
        <input id="refKeyword" placeholder="từ khóa tìm kiếm" 
            style="width: 100%; padding: 5px; margin: 5px 0;">

        <button id="openGoogleSearch" style="width:100%; padding:6px; margin-top:5px;">
            Mở Google Search (tab mới)
        </button>

        <p style="font-size:11px; color:#666; margin-top:6px;">
            B1: Mở Google Search bằng nút trên.<br>
            B2: Trong tab Google, tìm site và tự click → referer sẽ là Google thật.
        </p>

        <hr>

        <button id="hintUseCurrentTab" style="width:100%; padding:6px; margin-top:5px;">
            Hướng dẫn dùng tab Google hiện tại
        </button>

        <p id="statusRefer" style="font-size: 11px; color: #007bff; margin-top: 5px;"></p>
    `;
    box2.appendChild(content2);
    document.body.appendChild(box2);

    // DRAGGABLE cho box 2
    let offsetX2 = 0, offsetY2 = 0, mouseDown2 = false;

    header2.addEventListener("mousedown", (e) => {
        mouseDown2 = true;
        offsetX2 = e.clientX - box2.offsetLeft;
        offsetY2 = e.clientY - box2.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (mouseDown2) {
            box2.style.left = (e.clientX - offsetX2) + "px";
            box2.style.top = (e.clientY - offsetY2) + "px";
            box2.style.right = "auto"; // bỏ fixed right khi kéo
        }
    });

    document.addEventListener("mouseup", () => mouseDown2 = false);

    // NÚT: Mở Google Search
    document.getElementById("openGoogleSearch").onclick = () => {
        const kw = document.getElementById("refKeyword").value.trim() || "google search";
        const url = "https://www.google.com/search?q=" + encodeURIComponent(kw);
        window.open(url, "_blank");
        document.getElementById("statusRefer").innerText =
            "Đã mở Google Search trong tab mới. Vào tab đó, tìm site và click.";
    };

    // NÚT: Hướng dẫn dùng tab hiện tại (khi đang ở Google)
    document.getElementById("hintUseCurrentTab").onclick = () => {
        const target = document.getElementById("refTargetUrl").value.trim();
        if (!target) {
            document.getElementById("statusRefer").innerText =
                "Nhập URL đích (https://...) vào trước.";
            return;
        }

        document.getElementById("statusRefer").innerHTML =
            "Để dùng tab Google hiện tại làm referrer:<br>" +
            "1) Mở tab Google Search (google.com/search...).<br>" +
            "2) Mở Console, chạy:<br>" +
            "<code>location.href = '" + target.replace(/'/g, "\\'") + "';</code><br>" +
            "→ Server sẽ thấy referrer là trang Google hiện tại (nếu không bị chặn bởi policy.";
    };

})();
