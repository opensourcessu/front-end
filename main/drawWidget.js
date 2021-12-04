let widget_list = [];

let widget = {};

(function (_widget, _widget_list) {
    const request_url = "http://localhost:8000";
    const widget_type = [
        undefined,
        "search",
        "todo",
        "weather",
        "calender",
        "email",
        "image",
        "postit"
    ];
    const widget_size = [
        undefined,
        [12, 3],
        [8, 6],
        [3, 4],
        [4, 3],
        [4, 4],
        [2, 3],
        [2, 3],
    ];
    const widget_html = {
        search: 
        `<div id="webpage">
            <div id="menuholder">
                <a class="menu" href="#0" onclick="search_engine.nvmode();"><img src="../Images/네이버.png" width="30" hight="30"></a>
                <a class="menu" href="#0" onclick="search_engine.ggmode();"><img src="../Images/구글.png" width="30" hight="30"></a>
                <a class="menu" href="#0" onclick="search_engine.fcmode();"><img src="../Images/페북.png" width="30" hight="30"></a>
                <a class="menu" href="#0" onclick="search_engine.gitmode();"><img src="../Images/깃.png" width="30" hight="30"></a>
                <a class="menu" href="#0" onclick="search_engine.dmode();"><img src="../Images/다음.png" width="25" hight="25"></a>

            </div>
            <input id="srch" name="searchbox" type="text" autocomplete="off" maxlength="255" onkeydown="return search_engine.openurl(event);"
                autofocus />
        </div>`,
        todo: 
        `<div id="container">

            <div id="header"> To Do List </div>

            <div class="task-list task-container" id="pending">
                <h3>할 일</h3>
                <!--<div class="todo-task">
                    <div class="task-header">Sample Header</div>
                    <div class="task-date">25/06/1992</div>
                    <div class="task-description">Lorem Ipsum Dolor Sit Amet</div>
                </div>-->
            </div>

            <div class="task-list task-container" id="inProgress">
                <h3>진행중</h3>
            </div>

            <div class="task-list task-container" id="completed">
                <h3>완료</h3>
            </div>

            <div class="task-list">
                <h3>할 일 추가하기</h3>
                <form id="todo-form">
                    <input type="text" placeholder="제목" />
                    <textarea placeholder="설명"></textarea>
                    <input type="text" id="datepicker" placeholder="날짜 (yyyy-mm-dd)" />
                    <input type="button" class="btn btn-primary" value="추가하기" onclick="todo.add();" />
                </form>

                <input type="button" class="btn btn-primary" value="지우기" onclick="todo.clear();" />

                <div id="delete-div">
                    지우려면 여기로 드래그 하세요
                </div>
            </div>

            <div style="clear:both;"></div>

        </div>`,
        weather: "",
        calender: "",
        email: "",
        image: "<img src='$' style='width:200px; height:315px; border-radius:20px'>",
        postit: "<textarea style='width:200px; height:135px; background-color:pink; border-radius:5px; font-size:15px;'></textarea>",
    };

    function req_get_widget_lists() {
        var access_token = localStorage.getItem("access_token");
    
        return $.ajax({
            url: request_url + `/widgets`,
            method: "GET",
            headers: { Authorization: `jwt ${access_token}` },
            dataType: "json",
        });
    }

    _widget.init = function (table_id, callback) {
        let table = document.getElementById(table_id);
        
        req_get_widget_lists()
        .done(function (body) {
            for (const w of body.widgets) {
                let div = create_widget(w);
                table.appendChild(div);
            }
        })
        .fail(function () {
            console.log("request to server fail");
        })
        .always(function () {
            callback();
        });
    }

    function create_widget(item) {
        let coord = get_coordinate(item.location, item.widget_type_id);
        let div = document.createElement("div");
        div.setAttribute("id", `widget${item.widget_id}`);
        div.style.position = "absolute";
        div.style.left = coord.left + "px";
        div.style.top = coord.top + "px";
        div.style.width = coord.width + "px";
        div.style.height = coord.height + "px";
        div.innerHTML = widget_html[widget_type[item.widget_type_id]];
        
        return div;
    }

    function get_coordinate(location, widget_type_id) {
        const coor = {
            left: (location.pos[0] - 1) * 100,
            top: (location.pos[1] - 1) * 45,
            width: widget_size[widget_type_id][0] * 100, //location.size[0] * 100,
            height: widget_size[widget_type_id][1] * 45 //location.size[1] * 45
        };

        console.log(coor);

        return coor;
    }
})(widget, widget_list);

/////

function aasdf() {


//////

    var tableAddr = new Array(12); //
    var table = document.createElement("table");
    table.setAttribute("id", "table");
    table.setAttribute("border", 1);
    for (var i = 0; i < 12; i++) {
        var trString = "tr";
        tableAddr[i] = new Array(12);
        tableAddr[i] = document.createElement("tr");
        tableAddr[i].setAttribute("id", trString += i.toString());
        for (var j = 0; j < 12; j++) {
           
            tableAddr[i][j] = document.createElement("td");
            tableAddr[i][j].setAttribute("width", 100);
            tableAddr[i][j].setAttribute("height", 45);
            tableAddr[i][j].style.padding=0;

            var div=document.createElement("div");
            div.setAttribute("id", i.toString()+" "+j.toString()); //여기다가 위젯 넣으면 되겠다
            div.style.maxHeight="45px";
            tableAddr[i][j].appendChild(div);

            tableAddr[i][j].setAttribute("id", "td"+i.toString()+" "+j.toString());
            tableAddr[i].appendChild(tableAddr[i][j]);
        }
        table.appendChild(tableAddr[i]);
    }

    document.getElementById("setTable").appendChild(table);
    ///////////////////////테이블 만들기 끝
   
    for(var i=0;i<widgetCount;i++) {
        var loc=widgets[i][2].toString()+" "+widgets[i][3].toString();
        var content;
        if(widgets[i][1]==1) { //검색창

        } else if(widgets[i][1]==2) { //투두

        } else if(widgets[i][1]==3) { //날씨
            
        } else if(widgets[i][1]==4) { //캘린더
            
        } else if(widgets[i][1]==5) { //이메일
            
        } else if(widgets[i][1]==6) { //앨범
            content="<img src='/img/tree.png' style='width:200px; height:315px; border-radius:20px'>";
        } else if(widgets[i][1]==7) { //포스트잇
            content="<textarea style='width:200px; height:135px; background-color:pink; border-radius:5px; font-size:15px;'></textarea>";
        }
        document.getElementById(loc).innerHTML=content;
    }

  
/*
    var hi2 = "<img src='/img/tree.png' style='width:200px; height:340px; border-radius:20px'>";
    document.getElementById("5 6").innerHTML = hi2;

    var hi3="<textarea style='width:200px; height:135px; background-color:pink; border-radius:5px; font-size:15px;'></textarea>"
    document.getElementById("8 0").innerHTML = hi3;

    var hi4 = `<div id="webpage";">
   <div id="menuholder">
       <a class="menu" href="#0" onclick="init();"><img src="/img/naverIcon.png" width="30" hight="30"></a>
    <a class="menu" href="#0" onclick="ggmode();"><img src="/img/googleIcon.png" width="30" hight="30"></a>
    <a class="menu" href="#0" onclick="gitmode();"><img src="/img/utubeIcon.png" width="30" hight="30"></a>
    <a class="menu" href="#0" onclick="dmode();"><img src="/img/daumIcon.png" width="25" hight="25"></a>

   </div>
   <input id="srch" name="searchbox" type="text" autocomplete="off" maxlength="255" onkeydown="return openurl(event);"
       autofocus />
    </div>`;
    document.getElementById("0 0").innerHTML = hi4;
*/
    
}