"""Setup configuration for prettier-pre-commit."""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="prettier-pre-commit",
    version="0.1.0",
    author="Will Rice",
    description="A minimal pre-commit hook that uses prettier to format config files",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/will-rice/prettier-pre-commit",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
    entry_points={
        "console_scripts": [
            "prettier-pre-commit=prettier_pre_commit.main:main",
        ],
    },
)
