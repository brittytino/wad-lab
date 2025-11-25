# linear_search.py

n = int(input("Enter number of elements: "))

print("Enter", n, "integer values (space separated):")
arr_input = input()
arr_str_list = arr_input.split()
arr = []
for x in arr_str_list:
    arr.append(int(x))

key = int(input("Enter value to search: "))

position = -1   # -1 means not found

# Linear search
i = 0
while i < len(arr):
    if arr[i] == key:
        position = i + 1   # 1-based position
        break
    i += 1

if position == -1:
    print("Element not found in the array.")
else:
    print("Element found at position:", position)
