# remove_b_ac.py

s = input("Enter string: ")
result = []
i = 0

while i < len(s):
    if s[i] == 'b':
        i += 1
    elif i + 1 < len(s) and s[i] == 'a' and s[i + 1] == 'c':
        i += 2
    else:
        result.append(s[i])
        i += 1

print("Result string:", "".join(result))
