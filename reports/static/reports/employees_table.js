$(document).ready(function() {

    var dt_table = $('.datatable').dataTable({
        scrollY: "67vh",
        scrollCollapse: true,
        paging: false,
        dom: "<'row'<'col-md-12'tr>> <'row'<'col-md-12'i>>",
        language: dt_language,  // global variable defined in html
        order: [[ 0, "desc" ]],
        processing: true,
        serverSide: true,
        stateSave: true,
        ajax: {
            url: employees_json,
            data: function(data){
                return data;
            }
        }
    });

    var filterTable = [];
    for (let [i, value] of ['employee', 'job', 'site'].entries()) {
        filterTable.push({
            column_number: i,
            filter_type: "select",
            filter_container_id: "filter_" + value,
            style_class: "form-control",
            filter_reset_button_text: false,
            filter_default_label: "Wszystko"})}
    dt_table.yadcf(filterTable);
} )