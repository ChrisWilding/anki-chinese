#!/usr/bin/env python3

import csv
import os
import re

import sort

levels = {}

path = os.path.join(os.getcwd(), 'frequency', 'SUBTLEX-CH-WF')
frequencies = {}
with open(path, 'r') as inp:
    reader = csv.DictReader(inp, delimiter='\t')
    for row in reader:
        k = row['Word']
        v = float(row['W/million'])
        frequencies[k] = v

directory = os.path.join(os.getcwd(), 'hsk')

for i in range(1, 7):
    # Load HSK word list
    path = os.path.join(directory, '{}.txt'.format(i))
    with open(path, 'r') as words:
        levels[i] = [word.strip() for word in words if len(word.strip()) > 0]

new_levels = {}

for i in range(1, 7):
    # Remove words from previous HSK level
    previous = levels.get(i - 1, [])
    new_levels[i] = list(set(levels[i]) - set(previous))

    # Sort in frequency order
    words = sort.sort(frequencies, new_levels[i])

    # Output in frequency order
    path = os.path.join(directory, '{}.freq.txt'.format(i))
    with open(path, 'w') as out:
        out.write('\n'.join(words))
