#!/bin/sh

find . -name "*.pyc" -exec rm {} ";"
rm -rf lib/*
