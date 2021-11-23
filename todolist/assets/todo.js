/*
 * @author Shaumik "Dada" Daityari
 * @copyright December 2013
 */

/* Some info
Using newer versions of jQuery and jQuery UI in place of the links given in problem statement
All data is stored in local storage
User data is extracted from local storage and saved in variable todo.data
Otherwise, comments are provided at appropriate places
*/

var todo = todo || {},
    todoData = todoData || {}; // JSON.parse(localStorage.getItem("todoData"));

// data = data || {};

localStorage.setItem("access_token", "");


(function (todo, data, $) {
    const request_url = "http://localhost:8000"
    
    function req_get_task_list() {
        var access_token = localStorage.getItem("access_token");
    
        return $.ajax({
            url: request_url + `/todo`,
            method: "GET",
            headers: { Authorization: `jwt ${access_token}` },
            dataType: "json",
        });
    }

    function req_create_task(subj, content, date) {
        var access_token = localStorage.getItem("access_token");
        var deadline = `${date} 23:59:59`;

        req_body = {
            subject: subj,
            content: content,
            deadline: deadline,
        };
    
        return $.ajax({
            url: request_url + "/todo",
            method: "POST",
            headers: { Authorization: `jwt ${access_token}` },
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(req_body),
            dataType: "json",
        });
    }

    function req_change_task_status(id, status) {
        var access_token = localStorage.getItem("access_token");

        return $.ajax({
            url: request_url + `/todo/${id}`,
            method: "PATCH",
            headers: { Authorization: `jwt ${access_token}` },
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ status }),
            dataType: "json",
        });
    }

    function req_delete_task(id) {
        var access_token = localStorage.getItem("access_token");
    
        return $.ajax({
            url: request_url + `/todo/${id}`,
            method: "DELETE",
            headers: { Authorization: `jwt ${access_token}` },
            dataType: "json",
        });
    }

    var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        }, codes = {
            "0" : "#pending",
            "1" : "#inProgress",
            "2" : "#completed"
        };

    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);

        req_get_task_list().done(function (body) {
            body.tickets.map(val => {
                data[val.ticket_id] = {
                    id: val.ticket_id,
                    code: val.status.toString(),
                    title: val.subject,
                    date: val.deadline.split("T")[0],
                    description: val.content
                };
            });

            $.each(data, function (index, params) {
                generateElement(params);
            });
        });

        /*generateElement({
            id: "123",
            code: "0",
            title: "asd",
            date: "2013-12-22",
            description: "Blah Blah"
        });*/

        /*removeElement({
            id: "123",
            code: "0",
            title: "asd",
            date: "2013-12-22",
            description: "Blah Blah"
        });*/

        // Adding drop function to each category of task
        $.each(codes, function (index, value) {
            $(value).droppable({
                drop: function (event, ui) {
                        var element = ui.helper,
                            css_id = element.attr("id"),
                            id = css_id.replace(options.taskId, ""),
                            object = data[id];

                            req_change_task_status(id, parseInt(index)).done(val => {
                                // Removing old element
                                removeElement(object);
    
                                // Changing object code
                                object.code = index;
    
                                // Generating new element
                                generateElement(object);
    
                                // Updating Local Storage
                                data[id] = object;
                                
                                // localStorage.setItem("todoData", JSON.stringify(data));
                            });

                            // Hiding Delete Area
                            $("#" + defaults.deleteDiv).hide();
                    }
            });
        });

        // Adding drop function to delete div
        $("#" + options.deleteDiv).droppable({
            drop: function(event, ui) {
                var element = ui.helper,
                    css_id = element.attr("id"),
                    id = css_id.replace(options.taskId, ""),
                    object = data[id];

                req_delete_task(id).done(val => {
                    // Removing old element
                    removeElement(object);
    
                    // Updating local storage
                    delete data[id];
                    // localStorage.setItem("todoData", JSON.stringify(data));
                });

                // Hiding Delete Area
                $("#" + defaults.deleteDiv).hide();
            }
        })

    };

    // Add Task
    var generateElement = function(params){
        var parent = $(codes[params.code]),
            wrapper;

        if (!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + params.id,
            "data" : params.id
        }).appendTo(parent);

        $("<div />", {
            "class" : defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDate,
            "text": params.date
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

	    wrapper.draggable({
            start: function() {
                $("#" + defaults.deleteDiv).show();
            },
            stop: function() {
                $("#" + defaults.deleteDiv).hide();
            },
	        revert: "invalid",
	        revertDuration : 200
        });

    };

    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
    };

    todo.add = function() {
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Title can not be empty",
            id, title, description, date, tempData;

        if (inputs.length !== 4) {
            return;
        }

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;

        if (!title) {
            generateDialog(errorMessage);
            return;
        }

        // localStorage에 저장하는 것 대신 back-end 서버에 저장
        req_create_task(title, description, date).done(val => {
            tempData = {
                id : val.ticket_id,
                code: val.status,
                title: val.subject,
                date: val.deadline.split("T")[0],
                description: val.content
            };
    
            // Saving element in local storage
            data[val.ticket_id] = tempData;
            // localStorage.setItem("todoData", JSON.stringify(data));
    
            // Generate Todo Element
            generateElement(tempData);
        }).always(() => {
            // Reset Form
            inputs[0].value = "";
            inputs[1].value = "";
            inputs[2].value = "";
        });
    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "Message",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                    title: title,
                    id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            "Ok" : function () {
                responseDialog.dialog("close");
            }
        };

	    responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };

    todo.clear = function () {
        for (const key of Object.keys(data)) {
            req_delete_task(key);
        }

        data = {};
        // localStorage.setItem("todoData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

})(todo, todoData, jQuery);
