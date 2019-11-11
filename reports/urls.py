from django.urls import path
from .views import RecordsList, RecordsListJson
from .views import EmployeeList, EmployeeListJson

urlpatterns = [
    path('', RecordsList.as_view(), name="home"),
    path('reports', RecordsList.as_view(), name="reports"),
    path('reports/data/', RecordsListJson.as_view(), name="reports_data"),
    path('employees', EmployeeList.as_view(), name="employees"),
    path('employees/data/', EmployeeListJson.as_view(), name="employees_data"),
]