#!/usr/bin/env bash

pandoc TASKS.md -o TASKS.pdf \
    --number-sections \
    -V margin-top=3cm \
    -V margin-left=2cm \
    -V margin-right=2cm \
    -V margin-bottom=3cm
