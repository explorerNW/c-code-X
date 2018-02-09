/**
 * @author:c-code-XTEAM(explorerNW)
 */
!(() => {
    let triangle = document.querySelector(".triangle-wrapper");
    let contentRDK = document.querySelector("#contentRDK");
    triangle.addEventListener("click", function () {                
        document.documentElement.scrollTop = 0;
    }, true);
    console.log(Number(contentRDK.style.height));
    triangle.style.top = Number(contentRDK.style.height.toString()) - 60 + "px";
    triangle.style.left = Number(contentRDK.style.width.toString()) - 100 + "px";
    const $triangles = document.querySelectorAll('.triangle')
    const template = 
        `<svg class="triangle-svg" viewBox="0 0 140 141">
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <polygon class="triangle-polygon"  points="70 6 136 138 4 138"></polygon>
  </g>
</svg>`;

    Array.prototype.forEach.call($triangles, ($triangle, index) => {
        $triangle.innerHTML = template
    })
    fetch('https://t.vdfor.top/api/v0/docs/test/1').then(function (response) {
        response.json().then(function (data) {
            document.querySelector("#contentRDK").innerHTML = data.data;
        })
    })
})()