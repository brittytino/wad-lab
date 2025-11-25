def read_int_list(prompt):
    return list(map(int, input(prompt).split()))

def range_count(stack, a):
    count = 0
    temp = []
    while stack:
        val = stack.pop()
        if val >= a:
            count += 1
        temp.append(val)
    # restore stack
    while temp:
        stack.append(temp.pop())
    return count

if __name__ == "__main__":
    st = read_int_list("Enter stack elements (bottom to top): ")
    a = int(input("Enter a: "))
    print("Count of elements >= a:", range_count(st, a))
    print("Stack after function (unchanged logically):", st)
