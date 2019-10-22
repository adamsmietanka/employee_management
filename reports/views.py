from django.views.generic import TemplateView
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q
from .models import Record
from django.db.models import Sum


class TestModelList(TemplateView):
    template_name = 'reports/testmodel_list.html'

class TestModelListJson(BaseDatatableView):
    model = Record
    columns = ['employee', 'position', 'site', 'date', 'cash']
    order_columns = ['employee', 'position', 'site', 'date', 'cash']
    max_display_length = 500
    # columns and order columns are provided by datatables in the request using "name" in columns definition

    def get_filter_method(self):
        return self.FILTER_ICONTAINS

    def get_queryset(self):
        return Record.objects.all()

    def filter_queryset(self, qs):
        """ If search['value'] is provided then filter all searchable columns using filter_method (istartswith
            by default).

            Automatic filtering only works for Datatables 1.10+. For older versions override this method
        """
        columns = self._columns
        if not self.pre_camel_case_notation:
            # get global search value
            search = self._querydict.get('search[value]', None)
            maxDate = self._querydict.get('maxDate', None)
            minDate = self._querydict.get('minDate', None)
            q = Q()
            filter_method = self.get_filter_method()
            for col_no, col in enumerate(self.columns_data):
                # apply global search to all searchable columns
                if search and col['searchable']:
                    q |= Q(**{'{0}__{1}'.format(columns[col_no].replace('.', '__'), filter_method): search})
            if maxDate and minDate:
                q &= Q(**{'date__range': [minDate, maxDate]})
            qs = qs.filter(q)
        return qs



