var fields = ['#form_name',
    '#form_cost',
    '#form_color',
    '#form_company',
    '#form_count',
    '#form_numbers_of_requests',
    '#form_response_insert',
    '#form_response_load',
    '#main_form'];
$(document).ready(function () {
    validate_form();
    /* $("#main_form").submit(function (e) {
     data_insert(e);
     });*/
    $('#form_load').click(function () {
        data_load();
    });
});
function validate_form() {
    russian_message_of_errors();
    $(fields[8]).validate({
        rules:{
            form_name:{required:true, minlength:3},
            form_cost:{required:true, minlength:1, min:0},
            form_company:{required:true, minlength:3},
            form_count:{required:true, minlength:1, number:true}
        },
        submitHandler:data_insert_true
    });

}
function russian_message_of_errors() {
    jQuery.extend(jQuery.validator.messages, {
        required:"Это поле необходимо заполнить",
        number:"Введите число.",
        minlength:jQuery.format("Должно быть не менее {0} символов."),
        min:jQuery.format("Введите число больше или равное {0}.")
    });
}
function get_data_form(fields) {
    var inputs_value = [];
    for (var i = 0; i < fields.length; i++) {
        inputs_value[i] = $(fields[i]).val();
    }
    return inputs_value;
}
function response_animate(obj, color1, color2, text) {
    obj.html(text);
    obj.animate(
        {backgroundColor:color1},
        {
            queue:false,
            duration:700,
            complete:function () {
                $(this).animate({backgroundColor:color2}, {queue:false, duration:700})
            }
        }
    );
}
function ajax_success_insert(response) {
    var mydiv = $(fields[6]);
    if (response) {
        response_animate(mydiv, '#3CB371', ' #90EE90', 'Данные успешно добавлены в БД');
    }
    else {
        response_animate(mydiv, '#E9967A', ' #FFE4B5', 'Ошибка при добавление данных в БД');
    }
}
function create_dinamic_table(obj, data) {
    var info = '<table><tr><th>Product_id</th><th>Name</th><th>Cost</th><th>Color</th><th>Company</th><th>Count</th>';
    for (var i = 0; i < data.length; i++) {
        info += '<tr>';
        info += '<td>' + data[i].product_id + '</td><td>'
            + data[i].name + '</td><td>'
            + data[i].cost + '</td><td>'
            + data[i].color + '</td><td>'
            + data[i].company + '</td><td>'
            + data[i].count + '</td>';
        info += '</tr>'
    }
    info += '</tr></table>';
    obj.html(info);
}
function ajax_success_load(response) {
    var myTable = $(fields[7]);
    var result = eval("(" + response + ")");
    if (result.length) {
        create_dinamic_table(myTable, result);
    }
    else {
        myTable.html('Данные в таблице не найдены');
    }
}
function ajax_request(_data, link_on_func) {
    $.ajax({  type:"POST",
        url:"php/main.php",
        data:_data,
        cashe:false,
        success:link_on_func
    });
}
function data_insert_true() {
    var inputs_value = get_data_form(fields);
    ajax_request({   form_action:"insert",
            form_name:inputs_value[0],
            form_cost:inputs_value[1],
            form_color:inputs_value[2],
            form_company:inputs_value[3],
            form_count:inputs_value[4]},
        ajax_success_insert);
}
function data_load() {
    var numbers = $(fields[5]).val();
    ajax_request({   form_action:"load",
            form_numbers_of_request:numbers
        },
        ajax_success_load);
}


