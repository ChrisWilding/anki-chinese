import re

CLEAN = re.compile(r'^\w+')


def clean(word):
    return CLEAN.search(word).group(0)


def sort(frequencies, words):
    scored = []

    for word in words:
        clean_word = clean(word)
        score = frequencies.get(clean_word, 0)
        if score == 0:
            print("Needs manual intervention = {}".format(word))
        scored.append((word, score))

    scored = sorted(scored, key=lambda t: t[1], reverse=True)
    return [scored[0] for scored in scored]
