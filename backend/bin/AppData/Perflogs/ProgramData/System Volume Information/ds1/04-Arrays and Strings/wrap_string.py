# wrap_string.py

s = input("Enter string (no spaces, or treat all chars continuously): ")
w = int(input("Enter width: "))

i = 0
n = len(s)
while i < n:
    print(s[i:i + w])
    i += w
