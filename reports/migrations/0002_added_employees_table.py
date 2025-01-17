# Generated by Django 2.1.7 on 2019-11-11 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee', models.CharField(max_length=100, verbose_name='Pracownik')),
                ('position', models.CharField(max_length=100, verbose_name='Stanowisko')),
                ('site', models.CharField(max_length=100, verbose_name='Budowa')),
                ('wage', models.DecimalField(decimal_places=0, default=0, max_digits=4, verbose_name='Stawka')),
            ],
        ),
        migrations.AlterField(
            model_name='record',
            name='cash',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=4, verbose_name='Dniówka'),
        ),
    ]
