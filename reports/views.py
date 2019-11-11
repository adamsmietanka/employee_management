from django.views.generic import TemplateView
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q
from .models import Record, Employee


class RecordsList(TemplateView):
    template_name = 'reports/records_list.html'


class RecordsListJson(BaseDatatableView):
    model = Record
    columns = ['employee', 'position', 'site', 'date', 'cash']
    order_columns = ['employee', 'position', 'site', 'date', 'cash']
    max_display_length = 500

    def filter_queryset(self, qs):
        if not self.pre_camel_case_notation:
            search_employee = self._querydict.get('columns[0][search][value]', None)
            search_position = self._querydict.get('columns[1][search][value]', None)
            search_site = self._querydict.get('columns[2][search][value]', None)
            maxdate = self._querydict.get('maxDate', None)
            mindate = self._querydict.get('minDate', None)
            q = Q()
            if maxdate and mindate:
                q &= Q(**{'date__range': [mindate, maxdate]})
            q &= Q(**{'employee__icontains': search_employee})
            q &= Q(**{'position__icontains': search_position})
            q &= Q(**{'site__icontains': search_site})
            qs = qs.filter(q)
        return qs

    def get_context_data(self, *args, **kwargs):
        context = super(BaseDatatableView, self).get_context_data(**kwargs)
        columns = ['employee', 'position', 'site']
        search = [self._querydict.get('columns[{}][search][value]'.format(i), None) for i in range(3)]
        qs_filtered = []
        for i, col in enumerate(columns):
            q = Q()
            for j, col_inner in enumerate(columns):
                q &= Q(**{'{}__icontains'.format(col_inner): search[j]}) if j != i else Q()
            qs_filtered.append(Record.objects.filter(q))
            context['yadcf_data_{}'.format(i)] = self.get_unique_vals(qs_filtered[i], col)
        return context

    def get_unique_vals(self, qs, column):
        return list(qs.values_list(column, flat=True).distinct())


class EmployeeList(TemplateView):
    template_name = 'reports/employee_list.html'


class EmployeeListJson(BaseDatatableView):
    model = Employee
    columns = ['employee', 'position', 'site', 'wage']
    order_columns = ['employee', 'position', 'site', 'wage']
    max_display_length = 500
