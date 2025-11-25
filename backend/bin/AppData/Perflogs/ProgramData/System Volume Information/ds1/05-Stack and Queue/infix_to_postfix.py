def precedence(op):
    if op in ('*', '/', '%'):
        return 2
    if op in ('+', '-'):
        return 1
    if op == '^':
        return 3
    return 0

def infix_to_postfix(expr):
    stack = []
    output = []
    for ch in expr:
        if ch.isalnum():  # operand
            output.append(ch)
        elif ch == '(':
            stack.append(ch)
        elif ch == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            if stack and stack[-1] == '(':
                stack.pop()
        else:  # operator
            while stack and precedence(stack[-1]) >= precedence(ch) and stack[-1] != '(':
                output.append(stack.pop())
            stack.append(ch)
    while stack:
        output.append(stack.pop())
    return "".join(output)

if __name__ == "__main__":
    expr = input("Enter infix expression (no spaces): ")
    print("Postfix:", infix_to_postfix(expr))
