from django.db import models


class Record(models.Model):
    employee = models.CharField(max_length=100, verbose_name='Pracownik')
    position = models.CharField(max_length=100, verbose_name='Stanowisko')
    site = models.CharField(max_length=100, verbose_name='Budowa')
    date = models.DateField(verbose_name='Data')
    cash = models.DecimalField(max_digits=4, decimal_places=0, default=0, verbose_name='Dniówka')

    def __str__(self):
        return self.employee + ' - ' + self.position


class Employee(models.Model):
    employee = models.CharField(max_length=100, verbose_name='Pracownik')
    position = models.CharField(max_length=100, verbose_name='Stanowisko')
    site = models.CharField(max_length=100, verbose_name='Budowa')
    wage = models.DecimalField(max_digits=4, decimal_places=0, default=0, verbose_name='Stawka')

    def __str__(self):
        return self.employee + ' - ' + self.position
