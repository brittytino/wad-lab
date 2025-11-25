def is_well_formed(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in ')]}':
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return not stack

if __name__ == "__main__":
    s = input("Enter expression: ")
    print("Well formed?", is_well_formed(s))
