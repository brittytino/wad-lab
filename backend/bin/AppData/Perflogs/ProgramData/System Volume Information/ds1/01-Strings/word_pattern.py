# word_pattern.py

pattern = input("Enter pattern string: ")
s = input("Enter words string: ")

words = s.split()

if len(pattern) != len(words):
    print(False)
else:
    p_to_w = {}
    w_to_p = {}
    ok = True

    i = 0
    while i < len(pattern):
        p = pattern[i]
        w = words[i]

        if p in p_to_w:
            if p_to_w[p] != w:
                ok = False
                break
        else:
            p_to_w[p] = w

        if w in w_to_p:
            if w_to_p[w] != p:
                ok = False
                break
        else:
            w_to_p[w] = p

        i += 1

    print(ok)
