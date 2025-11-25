# sort_array.py

n = int(input("Enter number of elements: "))

print("Enter", n, "integer values (space separated):")
arr_input = input()
arr_str_list = arr_input.split()
arr = []
for x in arr_str_list:
    arr.append(int(x))

# Ascending
asc = arr[:]      # make a copy
asc.sort()

# Descending
desc = arr[:]     # make a copy
desc.sort(reverse=True)

print("Sorted in ascending order:")
print(asc)

print("Sorted in descending order:")
print(desc)
