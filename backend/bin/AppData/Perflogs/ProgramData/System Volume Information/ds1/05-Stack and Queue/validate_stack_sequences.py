def read_int_list(prompt):
    return list(map(int, input(prompt).split()))

def validate(pushed, popped):
    stack = []
    j = 0
    for x in pushed:
        stack.append(x)
        while stack and j < len(popped) and stack[-1] == popped[j]:
            stack.pop()
            j += 1
    return j == len(popped)

if __name__ == "__main__":
    pushed = read_int_list("Enter pushed sequence (space separated): ")
    popped = read_int_list("Enter popped sequence (space separated): ")
    print("Valid sequence?" , validate(pushed, popped))
