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
            q &= Q(**{'employee__icontains': search_employee})
            q &= Q(**{'position__icontains': search_position})
            q &= Q(**{'site__icontains': search_site})
            qs = qs.filter(q)
        return qs

    def get_context_data(self, *args, **kwargs):
        context = super(BaseDatatableView, self).get_context_data(**kwargs)
        qs = Record.objects.all()
        search_employee = self._querydict.get('columns[0][search][value]', None)
        search_position = self._querydict.get('columns[1][search][value]', None)
        search_site = self._querydict.get('columns[2][search][value]', None)
        q = Q()
        q &= Q(**{'employee__icontains': search_employee})
        q &= Q(**{'position__icontains': search_position})
        q &= Q(**{'site__icontains': search_site})
        qs_filtered = qs.filter(q)
        # qs = self.filter_queryset(Record.objects.all())
        context['yadcf_data_0'] = self.get_unique_values(qs, 'employee') if search_employee else self.get_unique_values(
            qs_filtered, 'employee')
        # if search_employee:
        #     context['yadcf_data_0'] = list(qs.order_by().values_list('employee', flat=True).distinct())
        # else:
        #     context['yadcf_data_0'] = list(qs_filtered.order_by().values_list('employee', flat=True).distinct())

        if search_position:
            context['yadcf_data_1'] = list(qs.order_by().values_list('position', flat=True).distinct())
        else:
            context['yadcf_data_1'] = list(qs_filtered.order_by().values_list('position', flat=True).distinct())

        if search_site:
            context['yadcf_data_2'] = list(qs.order_by().values_list('site', flat=True).distinct())
        else:
            context['yadcf_data_2'] = list(qs_filtered.order_by().values_list('site', flat=True).distinct())
        return context

    def get_unique_values(self, qs, column):
        return list(qs.order_by().values_list(column, flat=True).distinct())
