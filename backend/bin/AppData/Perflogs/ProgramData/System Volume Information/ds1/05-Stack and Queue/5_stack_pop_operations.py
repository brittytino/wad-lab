# stack_pop_operations.py

N = int(input("Enter N (size of stack): "))

print("Enter stack elements from TOP to BOTTOM (space separated):")
stack_input = input().split()
stack = [int(x) for x in stack_input]

print("Enter array elements (space separated):")
arr_input = input().split()
targets = [int(x) for x in arr_input]

results = []

for target in targets:
    # If target not in current stack, 0 pops
    if target not in stack:
        results.append(0)
        continue

    pops = 0
    # pop from top (front of list) until we find target
    while stack and stack[0] != target:
        stack.pop(0)
        pops += 1

    if stack and stack[0] == target:
        stack.pop(0)
        pops += 1

    results.append(pops)

print("Number of pop operations for each element:")
print(" ".join(str(x) for x in results))
