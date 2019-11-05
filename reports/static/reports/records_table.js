//DATE RANGE
//set global vars that are set by daterange picker, to be used by datatable
var startdate;
var enddate;

$(document).ready(function() {


    var dt_table = $('.datatable').dataTable({
        scrollY: "55vh",
        scrollCollapse: true,
        paging: false,
        dom: "<'row'<'text'><'col-md-6'B>> <'row'<'col-md-12'tr>> <'row'<'col-md-12'i>>",
        buttons: [
            { extend: 'pdfHtml5',
                footer: true,
                message: '123',
                customize : function (doc) {
						//Remove the title created by datatTables
						doc.content.splice(0,1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear();
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAsCAYAAAAgjfcKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTY5QTkyODM2MjA4MTFFOUI0QkVGRTkwRkQyQUI0MkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTY5QTkyODQ2MjA4MTFFOUI0QkVGRTkwRkQyQUI0MkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNjlBOTI4MTYyMDgxMUU5QjRCRUZFOTBGRDJBQjQyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNjlBOTI4MjYyMDgxMUU5QjRCRUZFOTBGRDJBQjQyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi1KJ3cAAAjsSURBVHja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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20,60,20,30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						doc['header']=(function() {
							return {
								columns: [
								    {
                                        image: logo,
                                        width: 128
                                    },
									{
										alignment: 'center',
										italics: false,
										text: 'Raport',
										fontSize: 24,
										margin: [10,0]
									}
								],
								margin: 20
							}
						});

						doc['footer']=(function(page, pages) {
							return {
								columns: [
									{
										alignment: 'left',
										text: ['Wygenerowano: ', { text: jsDate.toString() }]
									},
									{
										alignment: 'right',
										text: ['Strona ', { text: page.toString() }, ' z ',	{ text: pages.toString() }]
									}
								],
								margin: 20
							}
						});

						doc['content'][0] = [
                                                 'Data: ' + jsDate.toString(),
                                                 {
                                                    text: "Stanowisko: " + yadcf.exGetColumnFilterVal(dt_table, 1),
                                                    fontSize: 18
                                                 },
                                                 {
                                                     text: "Budowa: " + yadcf.exGetColumnFilterVal(dt_table, 2),
                                                     fontSize: 18
                                                 }
                                             ];
						console.log( doc.content );
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
						var objLayout = {};
						objLayout['hLineWidth'] = function(i) { return .5; };
						objLayout['vLineWidth'] = function(i) { return .5; };
						objLayout['hLineColor'] = function(i) { return '#aaa'; };
						objLayout['vLineColor'] = function(i) { return '#aaa'; };
						objLayout['paddingLeft'] = function(i) { return 4; };
						objLayout['paddingRight'] = function(i) { return 4; };
						doc.content[0].layout = objLayout;
				},
                text: '<i class="fas fa-file-pdf"></i> PDF',
                filename: function () {
                    startdate = $('#reportrange').data('daterangepicker').startDate;
                    range = $('#reportrange').data('daterangepicker').chosenLabel;
                    return 'Raport ' + startdate.format('YYYY-MM-DD') + ' - '+ yadcf.exGetColumnFilterVal(dt_table,2);
                    }
            },
            { extend: 'excel',
                footer: true,
                customize : function(doc) {
                    },
                text: '<i class="fas fa-file-excel"></i> Excel',
                filename: function () {
                    startdate = $('#reportrange').data('daterangepicker').startDate;
                    range = $('#reportrange').data('daterangepicker').chosenLabel;
                    return 'Raport ' + startdate.format('YYYY-MM-DD');// + ' - '+ $('.dataTables_filter input')[0].value;
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

    $("div.text").html('<label class="col-sm-3">Generuj raport:</label>');

//     $.busyLoadFull("show", {
// //    fontawesome: "fa fa-spinner fa-spin fa-3x fa-fw"
//     fontawesome: "fa fa-cog fa-spin  fa-3x fa-fw"
//     });

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

//    $('#reportrange').daterangepicker('setDate', Ten miesiąc);

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