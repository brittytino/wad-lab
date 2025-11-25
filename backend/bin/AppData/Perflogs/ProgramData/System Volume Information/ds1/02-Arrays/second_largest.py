# second_largest.py

# Read number of elements
n = int(input("Enter number of elements: "))

# Read array elements
print("Enter", n, "integer values (space separated):")
arr_input = input()
arr_str_list = arr_input.split()
arr = []
for x in arr_str_list:
    arr.append(int(x))

if n < 2:
    print("Need at least 2 values to find second largest.")
else:
    # Sort the array
    arr.sort()
    # Second largest is at index -2
    second_largest_value = arr[-2]
    print("Second largest value is:", second_largest_value)
