# string_basic_ops.py
# No len(), no slicing, no built-in reverse.

s = input("Enter a string: ")

# a) Length
length = 0
for _ in s:   # iterating over chars
    length += 1

print(length)

# b) Reverse
# First, put characters into a list to index them
chars = []
for ch in s:
    chars.append(ch)

# build reverse string manually
rev = ""
i = length - 1
while i >= 0:
    rev = rev + chars[i]
    i -= 1

print(rev)

# c) Copy
copy = ""
for ch in s:
    copy = copy + ch

print(copy)
