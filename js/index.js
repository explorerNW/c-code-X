/**
 * @author:c-code-XTEAM(explorerNW)
 */
//实例化Notify
let notify = new Notify();
!(() => {
    //获取屏幕宽度
    let clientWidth = Number(document.documentElement.clientWidth);
    //获取屏幕高度    
    let clientHeight = Number(document.documentElement.clientHeight);
    //获取导航栏节点
    let navigationBar = document.querySelector(".navigationBar");    
    //获取content节点
    let content = document.querySelector(".content");
    //设置content高度
    content.style.height = clientHeight - 100 + "px";
    //获取top节点
    let top = document.querySelector(".top");
    //获取content的iframe节点
    let myFrame = document.querySelector("#myframe");   
    //获取隐藏按钮节点
    let hiddeBtn = document.querySelector("#HideShow");
    

    //设置导航栏的高度与屏幕高度一致
    navigationBar.style.position = "absolute";
    navigationBar.style.left = "0px";
    navigationBar.style.top = "0px";
    navigationBar.style.width = clientWidth*0.20+"px";      
    navigationBar.style.height = clientHeight + "px";  

    //监听导航栏点击事件改变iframe的src值
    document.querySelector(".navigationBar").addEventListener("click", function (event) {
        if (event.target.id === "rdk") {
            myFrame.src = "rdk.html";
        } else if (event.target.id === "table") {
            myFrame.src = "table.html";
        }else if(event.target.id === "home"){
            myFrame.src = "home.html";
        }
    }, true);

    //隐藏按钮
    hiddeBtn.style.position = "absolute";    
    hiddeBtn.style.top = "30px";            
    hiddeBtn.style.left = Number(((navigationBar.style.width).replace(/px/g,'')).toString())+"px";//Number(((navigationBar.style.width).replace(/px/g,'')).toString())+"px";   (navigationBar.style.width).toString()


    //屏幕适配-------------------当屏幕宽度小于600时自动导航栏隐藏
    if (clientWidth < 600) {
        navigationBar.style.width = Number((navigationBar.style.width.toString()).replace(/px/g,''))+20+"px"
        navigationBar.style.fontSize = "15px";
        hiddeBtn.style.left = Number(((navigationBar.style.width).replace(/px/g,'')).toString())+"px";
        navigationBar.style.left = -Number((navigationBar.style.width).toString().replace("px",''))+"px";
        content.style.width = "100%";
        top.style.width = "100%";
    }
    
    
    myFrame.addEventListener("click",function(event){
                    console.log(event.target);
    },true);

    //监听隐藏按钮的click事件实现导航栏的出现于隐藏
    hiddeBtn.addEventListener("click", function () {            
        if (navigationBar.style.left != "0px") {                                                       
            navigationBar.style.left = "0px";
            content.style.width = "80%";
            //top.style.width = "80%";
        } else {                                
            navigationBar.style.left = -Number(((navigationBar.style.width).toString()).replace("px",''))+ "px";
            content.style.width = "100%";
            top.style.width = "100%";
        }
    }, true);
})()