from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in movies_roam/__init__.py
from movies_roam import __version__ as version

setup(
	name="movies_roam",
	version=version,
	description="This is an interview app",
	author="Stephen",
	author_email="wachangasteve@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
