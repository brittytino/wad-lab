def read_int_list(prompt):
    return list(map(int, input(prompt).split()))

if __name__ == "__main__":
    target = read_int_list("Enter target array (space separated): ")
    n = int(input("Enter n (stream 1..n): "))

    ops = []
    stream_val = 1
    stack = []
    idx = 0

    while idx < len(target):
        if stream_val > n:
            break
        ops.append("Push")
        stack.append(stream_val)
        if stack[-1] == target[idx]:
            idx += 1
        else:
            ops.append("Pop")
            stack.pop()
        stream_val += 1

    if idx == len(target):
        print("Operations:")
        for op in ops:
            print(op)
    else:
        print("Cannot build target with given n.")
