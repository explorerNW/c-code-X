//实例化Notify
let notify = new Notify();
!(() => {        
    let clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight; 
    let navigationBar =document.querySelector(".navigationBar");
    navigationBar.style.height = clientHeight+"px";            
    let content = document.querySelector(".content");
    content.style.height = Number(clientHeight)-100+"px";
    let top = document.querySelector(".top");
    let myFrame = document.querySelector("#myframe");
    myFrame.style.height = clientHeight+"px";    
    document.querySelector(".navigationBar").addEventListener("click", function (event) {        
        if (event.target.id === "rdk") {
            myFrame.src = "rdk.html";
        } else if(event.target.id === "table") {            
            myFrame.src = "table.html";
        }
    }, false);
    if(document.documentElement.clientWidth<600){
        navigationBar.style.display = "none";
        content.style.width = "100%";
        top.style.width = "100%";
    }
    document.querySelector("#HideShow").addEventListener("click",function(){
                    if(navigationBar.style.display != "none"){
                        this.style.left = 0+"px";
                        navigationBar.style.display = "none";
                        content.style.width = "100%";
                        top.style.width = "100%";                        
                    }else{
                        this.style.left = clientWidth*0.2+"px";
                        navigationBar.style.display = "block";
                        content.style.width = "80%";
                        top.style.width = "80%";                        
                    }
                        
    },true);
})()