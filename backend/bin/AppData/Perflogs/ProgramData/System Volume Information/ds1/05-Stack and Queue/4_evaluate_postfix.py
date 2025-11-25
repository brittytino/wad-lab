# evaluate_postfix.py

expr = input("Enter postfix expression (e.g., 245+*): ").strip()

stack = []

def apply_op(a, b, op):
    if op == '+':
        return a + b
    if op == '-':
        return a - b
    if op == '*':
        return a * b
    if op == '/':
        # integer division like in classic stack problems
        return a // b

for ch in expr:
    if ch.isdigit():
        stack.append(int(ch))
    else:
        # operator
        if len(stack) < 2:
            print("Invalid expression")
            break
        b = stack.pop()
        a = stack.pop()
        res = apply_op(a, b, ch)
        stack.append(res)

if len(stack) == 1:
    print("The result of expression", expr, "=", stack[0])
else:
    if stack:
        print("Invalid expression, stack:", stack)
