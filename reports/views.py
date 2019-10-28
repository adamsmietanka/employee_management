from django.views.generic import TemplateView
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q
from .models import Record


class TestModelList(TemplateView):
    template_name = 'reports/testmodel_list.html'

class TestModelListJson(BaseDatatableView):
    model = Record
    columns = ['employee', 'position', 'site', 'date', 'cash']
    order_columns = ['employee', 'position', 'site', 'date', 'cash']
    max_display_length = 500

    def get_queryset(self):
        return Record.objects.all()

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
            q &= Q(**{'position__icontains': search_position})
            q &= Q(**{'site__icontains': search_site})
            q &= Q(**{'employee__icontains': search_employee})
            qs = qs.filter(q)
        return qs

    def get_context_data(self, *args, **kwargs):
        context = super(BaseDatatableView, self).get_context_data(**kwargs)
        context['yadcf_data_0'] = list(Record.objects.order_by().values_list('employee', flat=True).distinct())
        context['yadcf_data_1'] = list(Record.objects.order_by().values_list('position', flat=True).distinct())
        context['yadcf_data_2'] = list(Record.objects.order_by().values_list('site', flat=True).distinct())
        return context
