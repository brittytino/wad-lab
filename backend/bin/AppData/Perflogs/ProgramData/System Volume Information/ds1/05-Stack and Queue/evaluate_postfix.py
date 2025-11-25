def apply_op(a, b, op):
    if op == '+': return a + b
    if op == '-': return a - b
    if op == '*': return a * b
    if op == '/': return a / b
    if op == '%': return a % b
    if op == '^': return a ** b

def eval_postfix(expr):
    stack = []
    tokens = expr.split()
    for t in tokens:
        if t.lstrip('-').isdigit():
            stack.append(int(t))
        else:
            b = stack.pop()
            a = stack.pop()
            stack.append(apply_op(a, b, t))
    return stack.pop()

if __name__ == "__main__":
    expr = input("Enter postfix expression (space separated): ")
    print("Result:", eval_postfix(expr))
