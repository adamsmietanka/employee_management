from django.urls import path
from .views import TestModelList, TestModelListJson

urlpatterns = [
    path('', TestModelList.as_view(), name="testmodel"),
    path('data/', TestModelListJson.as_view(), name="testmodel_list_json"),
]