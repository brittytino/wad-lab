# isomorphic_strings.py

s = input("Enter first string (s): ")
t = input("Enter second string (t): ")

if len(s) != len(t):
    print("False (Different lengths)")
else:
    map_st = {}
    map_ts = {}
    is_isomorphic = True

    i = 0
    while i < len(s):
        c1 = s[i]
        c2 = t[i]

        if c1 in map_st:
            if map_st[c1] != c2:
                is_isomorphic = False
                break
        else:
            map_st[c1] = c2

        if c2 in map_ts:
            if map_ts[c2] != c1:
                is_isomorphic = False
                break
        else:
            map_ts[c2] = c1

        i += 1

    print(is_isomorphic)
