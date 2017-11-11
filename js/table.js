/**
 * @author:c-code-XTEAM(explorerNW)
 */
!(() => {
    const template = ` `;
    function parseToHtml(htmlTemp) {
        var div = document.createElement("div");
        div.innerHTML = template;
        return div.children[0];
    };

    function parseToTable(temp) {
        var tr = document.createElement("tr");
        tr.innerHTML = temp;
        return tr;
    }

    let startTime = null;
    let endTime = null;
    let typeValue = null;
    let statusValue = null;
    let clientWidth = null;
    let clientHeight = null;
    let resultData = null;
    let page = 1;
    let latestPage = null;
    let pageSize = 50;
    let latestTr = 0;
    let notifyContent = null;
    let temp = null;
    let temp2 = null;
    let btnValue = null;
    let clickTime = null;
    let btn1Value = null;
    class queryDate {
        //初始化
        constructor() {
            //获取body容器
            this.container = document.body;
            //将template添加到容器                 
            //this.container.appendChild(parseToHtml(template));
            //container节点
            //this.containerNode = document.querySelector(".container");
            //获取information-module节点
            this.informationModuleNode = document.querySelector(".information-module");
            this.informationModuleNode.style.height = document.documentElement.clientHeight-100+"px";
            //获取resultTable
            this.resultTable = document.querySelector("#resultTable");
            //获取startTime节点            
            this.startTimeNode = document.querySelector("#startTime");
            //获取endTime节点
            this.endTimeNode = document.querySelector("#endTime");
            //this.endTimeNode = document.getElementById("endTime");
            //获取queryBtn
            this.queryBtnNode = document.querySelector("#query");
            //获取optionNode            
            this.optionNode = document.querySelector("#option");
            //获取tableTitle节点
            this.tableTitleNode = document.querySelector("#tableTitle");
            //获取resulRow节点
            this.resultRow = document.querySelector("#resultRow");
            //获取(before next)button
            this.beforePage = document.querySelector("#beforePage");
            this.nextPage = document.querySelector("#nextPage");
            //获取数据
            this._getQueryParameterValue(this);
            this.typeSelectorNode = document.getElementById("typeSelector");
            this.statusSelectorNode = document.getElementById("statusSelector");
            //获取addBtn
            this.addBtn = document.querySelector("#add");
            //获取cutdownBtn
            this.cutdownBtn = document.querySelector("#cutdown");
            //获取当前时间
            this._getcurrentDate();
            typeValue = this.typeSelectorNode.value;
            statusValue = this.statusSelectorNode.value;
            //clientWH
            //this._getClientWidthHeight();
            //initElementWidth&Height
            //this._initElementWidthHeight();
            //获得后台数据
            this._getData();
            this._beforePage(this);
            this._nextPage(this);
            //初始化table
            this._initTable();
            //cutdownFivePage
            this._cutdownFivePage(this);
            //cutdownFivePage()
            this._addFivePage(this);
            //加减页码组件的第一个btn
            this.firstAddBtn = document.querySelector("#btn1");
        }



        //获取当前系统时间
        _getcurrentDate() {
            let current = new Date();
            let year = current.getFullYear();
            let month = Number(current.getMonth()) + 1;
            let startMonth = Number(month) - 1;
            let day = current.getDate();
            if (Number(month) < 10) {
                month = "0" + month;
            }
            if (Number(startMonth) < 10) {
                startMonth = "0" + startMonth;
            }
            if (Number(day) < 10) {
                day = "0" + day;
            }
            //设置开始时间
            startTime = (year + "-" + startMonth + "-" + day).toString();
            this.startTimeNode.value = (year + "-" + startMonth + "-" + day).toString();
            //设置结束时间
            endTime = (year + "-" + month + "-" + day).toString();
            this.endTimeNode.value = (year + "-" + month + "-" + day).toString();
        }

        //获取屏幕宽高
        _getClientWidthHeight() {
            clientWidth = document.documentElement.clientWidth;
            clientHeight = document.documentElement.clientHeight;
        }

        //initElementWidth&Height
        _initElementWidthHeight() {


        }

        //获取查询参数的值
        _getQueryParameterValue(obj) {
            var date = document.getElementById("date");
            //监听click事件
            date.addEventListener("click", function (event) {
                if (event.target.id === "query") {
                    typeValue = obj.typeSelectorNode.value;
                    statusValue = obj.statusSelectorNode.value;
                    startTime = obj.startTimeNode.value;
                    endTime = obj.endTimeNode.value;
                    obj._getData();
                }
            }, true);
        }
        //初始化table
        _initTable() {
            for (let i = 0; i < `${pageSize}`; i++) {
                let tr = document.createElement("tr");
                tr.setAttribute("id", "row" + i);
                for (let j = 0; j < 5; j++) {
                    let td = document.createElement("td");
                    td.setAttribute("id", "row" + i + "col" + j);
                    tr.appendChild(td);
                }
                this.resultRow.appendChild(tr);
            }
        }
        //下一页
        _nextPage(obj) {
            this.nextPage.addEventListener("click", function () {
                if (page >= latestPage) {
                    obj.nextPage.disabled = true;
                    pageSize = latestTr;
                    page--;
                } else {
                    page++;
                    obj.beforePage.disabled = false;
                    for (let i = 1; i <= 5; i++) {
                        document.querySelector("#btn" + i).value = Number(document.querySelector("#btn" + i).value) + 1;
                        document.querySelector("#btn" + i).innerHTML = document.querySelector("#btn" + i).value;
                    }
                }
                obj._getData();
            }, true);
        }
        //上一页
        _beforePage(obj) {
            this.beforePage.addEventListener("click", function () {
                page--;
                if (page < 1) {
                    obj.beforePage.disabled = true;
                    page = 1;
                } else {
                    obj.nextPage.disabled = false;
                    for (let i = 1; i <= 5; i++) {
                        document.querySelector("#btn" + i).value = Number(document.querySelector("#btn" + i).value)>1?Number(document.querySelector("#btn" + i).value) - 1:1;
                        document.querySelector("#btn" + i).innerHTML = document.querySelector("#btn" + i).value;
                    }
                    obj._getData();
                }
            }, true);
        }

        //addFivePage
        _addFivePage(obj) {
            this.addBtn.addEventListener("click", function () {
                if (btn1Value <= 5 + btn1Value) {
                    for (let i = 1; i <= 5; i++) {
                        btnValue = Number(document.querySelector("#btn" + i).value);
                        btnValue += 5;
                        document.querySelector("#btn" + i).value = btnValue;
                        document.querySelector("#btn" + i).innerHTML = btnValue;
                    }
                }
            }, true);
        }
        //cutdownPage
        _cutdownFivePage(obj) {
            this.cutdownBtn.addEventListener("click", function () {
                btn1Value = Number(obj.firstAddBtn.value);
                if (btn1Value >= btn1Value - 5 && btn1Value > 1) {
                    for (let j = 1; j <= 5; j++) {
                        btnValue = Number(document.querySelector("#btn" + j).value);
                        btnValue -= 5;
                        document.querySelector("#btn" + j).value = btnValue;
                        document.querySelector("#btn" + j).innerHTML = btnValue;
                    }
                }
            }, true);
        }

        //fetch获取后台数据
        _getData() {
            let URL = `https://t.vdfor.top/api/v0/hy/test/list?type=${typeValue}&status=${statusValue}&startTime=${startTime}&endTime=${endTime}&current=${page}&pageSize=${pageSize}`;
            fetch(URL).then(function (response) {
                let resultRow = document.querySelector("#resultRow");
                response.json().then(function (data) {
                    resultData = data.data;
                    if (latestPage == null) {
                        latestPage = (data.total % pageSize) == 0 ? (data.total / pageSize) : ((data.total / pageSize) + 1) ^ 0;
                    }
                    if (latestTr == 0) {
                        latestTr = data.total % pageSize;
                    }
                    for (let i = 0; i < pageSize; i++) {
                        for (let j = 0; j < 5; j++) {
                            switch (j) {
                                case 0:
                                    document.querySelector("#row" + i + "col" + j).innerHTML = resultData[i].name;
                                    break;
                                case 1:
                                    if (Number(resultData[i].type) === 1) {
                                        document.querySelector("#row" + i + "col" + j).innerHTML = "Docker";
                                    } else {
                                        document.querySelector("#row" + i + "col" + j).innerHTML = "OpenStack";
                                    }
                                    break;
                                case 2:
                                    switch (resultData[i].status) {
                                        case 1:
                                            temp = `<span class = "Running">Running</span>`;
                                            break;
                                        case 2:
                                            temp = `<span class = "Finished">Finished</span>`;
                                            break;
                                        case 3:
                                            temp = `<span class = "Error">Error</span>`;
                                    }
                                    document.querySelector("#row" + i + "col" + j).innerHTML = temp;
                                    break;
                                case 3:
                                    document.querySelector("#row" + i + "col" + j).innerHTML = resultData[i].time;
                                    break;
                                case 4:
                                    temp2 = `<span  class = "hidden">告警</span>`;
                                    if (resultData[i].warning_log === 1) {
                                        temp2 = `<span class = "show" onclick = "javascript:notify.contentNode.innerHTML = 'warning!';notify.popWindow.style.display='block';notify.maskLayer.style.display='block';">告警</span>`;
                                    }
                                    if (resultData[i].info_log === 1) {
                                        notifyContent = "192.168." + (resultData[i].name).match((/[\d]/g)).toString().replace(/,/g, '') + "正在回滚";
                                        temp2 = `<span class = "details"  onclick = "javascript:notify.contentNode.innerHTML= '${notifyContent}';notify.popWindow.style.display='block';notify.maskLayer.style.display='block';" >详情</span>` + temp2;
                                    } else {
                                        temp2 = `<span class = " hidden">详情</span>` + temp2;
                                    }
                                    //notifyContent = "192.168."+(resultData[i].name).match((/[\d]/g)).toString().replace(/,/g,'')+"备份未成功..."; onclick = "javascript:notify.contentNode.innerHTML= '${notifyContent}';notify.popWindow.style.display='block';notify.maskLayer.style.display='block';"                                         
                                    document.querySelector("#row" + i + "col" + j).innerHTML = temp2;
                            }
                        }
                    }
                });
            });
        }
    }
    //把class Date暴露
    //window.queryDate = queryDate;
    new queryDate();
})()