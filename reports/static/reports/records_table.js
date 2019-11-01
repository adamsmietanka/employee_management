//DATE RANGE
//set global vars that are set by daterange picker, to be used by datatable
var startdate;
var enddate;

$(document).ready(function() {
    var dt_table = $('.datatable').dataTable({
        "scrollY": "60vh",
        scrollCollapse: true,
        paging: false,
        "dom": "<'row'<'col-md-6'B>> <'row'<'col-md-12't>> <'row'<'col-md-12'i>>",
        buttons: [
            { extend: 'pdfHtml5',
                footer: true,
                customize : function(doc) {
                    },
                text: '<i class="fas fa-save"></i> Raport PDF',
                filename: function () {
                    startdate = $('#reportrange').data('daterangepicker').startDate;
                    range = $('#reportrange').data('daterangepicker').chosenLabel;
                    return 'Raport ' + startdate.format('YYYY-MM-DD') + ' - '+ $('.dataTables_filter input')[0].value;
                    }
            },
            { extend: 'excel',
                footer: true,
                header: true,
                customize : function(doc) {
                    },
                text: 'Raport Excel',
//                filename: function () {
//                    startdate = $('#reportrange').data('daterangepicker').startDate;
//                    range = $('#reportrange').data('daterangepicker').chosenLabel;
//                    return 'Raport ' + startdate.format('YYYY-MM-DD') + ' - '+ $('.dataTables_filter input')[0].value;
//                    }
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
        footerCallback: function ( row, data, start, end, display ) {
                var api = this.api();

                    var total = api
                        .column( 4 )
                        .data()
                        .reduce( function (a, b) {
                        return parseFloat(a) + parseFloat(b);
                    }, 0 );

                //Update footer
                $( api.column( 4 ).footer() ).html('Razem: ' + total + ' zł');
            },
        ajax: {
            // Add dates to the query
            url: records_json,
            data: function(data){
                data.minDate = startdate;
                data.maxDate = enddate;
                return data;
            }
        },
    });

    $.busyLoadFull("show", {
//    fontawesome: "fa fa-spinner fa-spin fa-3x fa-fw"
    fontawesome: "fa fa-cog fa-spin  fa-3x fa-fw"
    });

    $(document).ajaxStop(function () {
        $('#content').fadeIn('fast');
        $.busyLoadFull("hide", {
            fontawesome: "fa fa-cog fa-spin fa-3x fa-fw"
        });
    });

    //instantiate datepicker and choose your format of the dates
    $('#reportrange').daterangepicker({
            ranges: {
               "Dzisiaj": [moment(), moment()],
               'Wczoraj': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Ostatnie 7 dni': [moment().subtract(6, 'days'), moment()],
               'Ostatnie 30 dni': [moment().subtract(29, 'days'), moment()],
               'Ten miesiąc': [moment().startOf('month'), moment().endOf('month')],
               'Poprzedni miesiąc': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
    ,
        opens: "right",
        format: 'YYYY-MM-DD',
        locale: datepicker_language,
    },
    function(start, end,label) {
        // Parse it to a moment
        var s = moment(start.toISOString());
        var e = moment(end.toISOString());
        startdate = s.format("YYYY/MM/DD");
        enddate = e.format("YYYY/MM/DD");
        $('#reportrange span').html(startdate + ' - ' + enddate);
    });

    //Filter the datatable on the datepicker apply event
    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        startdate = picker.startDate.format('YYYY-MM-DD');
        enddate = picker.endDate.format('YYYY-MM-DD');
        dt_table.fnDraw();
    });

    dt_table.yadcf([
            {
                column_number: 0,
                filter_type: "select",
                filter_container_id: "filter_employee",
                style_class: "form-control",
                filter_reset_button_text: false,
                filter_default_label: "Wybierz pracownika"
            },
            {
                column_number: 1,
                filter_type: "select",
                filter_container_id: "filter_job",
                style_class: "form-control",
                filter_reset_button_text: false,
                filter_default_label: "Wybierz stanowisko"
            },
            {
                column_number: 2,
                filter_type: "select",
                filter_container_id: "filter_site",
                style_class: "form-control",
                filter_reset_button_text: false,
                filter_default_label: "Wybierz budowę"
            }
        ]);

} );