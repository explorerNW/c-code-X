!(() => {
    fetch('https://t.vdfor.top/api/v0/docs/test/1').then(function (response) {
        response.json().then(function (data) {
            document.body.innerHTML = data.data;
        })
    })
})()