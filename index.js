const body = document.querySelector('body');
const num = 32;
const array = new Uint8Array(num*2);
const width = 10;
let context = undefined;

window.onclick =  async () => {
    if (context) return;

    body.querySelector("h1").remove();

    for (let i = 0; i < num; i++) {
        const logo = document.createElement('div');
        logo.classList.add("logo");
        logo.style.background = "red";
        logo.style.minWidth = width + "px";
        body.appendChild(logo);
    }

    const myEl = document.querySelectorAll(".logo");
    context = new AudioContext();
    const analyzer = context.createAnalyser();
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
        const src = context.createMediaStreamSource(stream);
        src.connect(analyzer);
        loop();
    } catch (error) {
        alert(error + '\r\n Отклонено, Страница будет обновлена');
        location.reload();
    } 

    function loop() {
        window.requestAnimationFrame(loop);
        analyzer.getByteFrequencyData(array);
        for (let i = 0; i < num; i++) {
            const height = array[i + num];
            myEl[i].style.height = height + "px";
            myEl[i].style.opacity = 0.008 * height;
        }
    }
} 

