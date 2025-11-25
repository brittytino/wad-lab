# rotate_array.py

n = int(input("Enter number of elements: "))

print("Enter", n, "integer values (space separated):")
arr_input = input()
arr_str_list = arr_input.split()
arr = []
for x in arr_str_list:
    arr.append(int(x))

key = int(input("Enter key (number of times to rotate left): "))

if n == 0:
    print("Empty array, nothing to rotate.")
else:
    key = key % n  # handle key > n

    # Left rotation by slicing
    rotated = arr[key:] + arr[:key]

    print("Array after rotation:")
    print(rotated)
