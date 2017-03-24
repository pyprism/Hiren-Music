from django.test import TestCase
from django.test import Client
# Create your tests here.


class IndexPageTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_uses_login_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'index.html')