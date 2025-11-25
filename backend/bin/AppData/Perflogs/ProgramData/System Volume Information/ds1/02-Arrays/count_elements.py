# count_elements.py

n = int(input("Enter number of elements: "))

print("Enter", n, "integer values (space separated):")
arr_input = input()
arr_str_list = arr_input.split()
arr = []
for x in arr_str_list:
    arr.append(int(x))

pos_count = 0
neg_count = 0
even_count = 0
odd_count = 0

for val in arr:
    if val > 0:
        pos_count += 1
    elif val < 0:
        neg_count += 1

    if val % 2 == 0:
        even_count += 1
    else:
        odd_count += 1

print("Number of positive elements:", pos_count)
print("Number of negative elements:", neg_count)
print("Number of even elements:", even_count)
print("Number of odd elements:", odd_count)
