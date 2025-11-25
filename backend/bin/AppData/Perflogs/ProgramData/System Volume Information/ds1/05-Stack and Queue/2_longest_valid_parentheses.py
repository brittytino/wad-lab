# longest_valid_parentheses.py

s = input("Enter parentheses string: ")

stack = [-1]
max_len = 0

i = 0
while i < len(s):
    if s[i] == '(':
        stack.append(i)
    else:  # ')'
        stack.pop()
        if not stack:
            stack.append(i)
        else:
            length = i - stack[-1]
            if length > max_len:
                max_len = length
    i += 1

print("Length of longest valid parentheses substring:", max_len)
