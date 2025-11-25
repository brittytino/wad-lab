# decode_string.py

s = input("Enter encoded string: ")

count_stack = []
string_stack = []

current_str = ""
current_num = 0

for ch in s:
    if ch.isdigit():
        # Build the full number (may have multiple digits)
        current_num = current_num * 10 + int(ch)
    elif ch == '[':
        # Push current context to stacks
        count_stack.append(current_num)
        string_stack.append(current_str)
        # Reset for new segment
        current_num = 0
        current_str = ""
    elif ch == ']':
        # Pop last context
        repeat_times = count_stack.pop()
        prev_str = string_stack.pop()
        current_str = prev_str + current_str * repeat_times
    else:
        # Normal character
        current_str += ch

print("Decoded string:", current_str)
