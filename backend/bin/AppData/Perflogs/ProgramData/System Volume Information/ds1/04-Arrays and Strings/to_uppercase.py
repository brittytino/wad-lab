# to_uppercase.py

s = input("Enter string: ")
result = ""

for ch in s:
    if 'a' <= ch <= 'z':
        result += chr(ord(ch) - (ord('a') - ord('A')))
    else:
        result += ch

print(result)
