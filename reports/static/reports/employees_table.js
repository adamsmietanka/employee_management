$(document).ready(function() {

    var dt_table = $('.datatable').dataTable({
        scrollY: "63vh",
        scrollCollapse: true,
        paging: false,
        dom: "<'row'<'col-md-12'tr>> <'row'<'col-md-12'i>>",
        buttons: [
            {   extend: 'pdfHtml5',
                footer: true,
                text: '<i class="fas fa-file-pdf"></i> PDF',
                filename: function () {
                    range = $('#reportrange').data('daterangepicker').chosenLabel;
                    return 'Raport ' + startdate + ' - '+ yadcf.exGetColumnFilterVal(dt_table,2);
                    }
            },
            { extend: 'excel',
                footer: true,
                text: '<i class="fas fa-file-excel"></i> Excel',
                filename: function () {
                    range = $('#reportrange').data('daterangepicker').chosenLabel;
                    return 'Raport ' + startdate;// + ' - '+ $('.dataTables_filter input')[0].value;
                    }
            }
        ],
        language: dt_language,  // global variable defined in html
        order: [[ 0, "desc" ]],
        columnDefs: [
            {orderable: true,
             searchable: true,
             className: "center",
            }
        ],
        searching: true,
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

    $("div.text").html('<label class="col-3">Generuj raport:</label>');


    var filterTable = [];
    var filterContainers = ['employee', 'job', 'site'];
    for (let [i, value] of filterContainers.entries()) {
        filterTable.push({
            column_number: i,
            filter_type: "select",
            filter_container_id: "filter_" + value,
            style_class: "form-control",
            filter_reset_button_text: false,
            filter_default_label: "Wszystko"})}
    dt_table.yadcf(filterTable);
} )