# corner_elements.py

r = int(input("Enter number of rows: "))
c = int(input("Enter number of columns: "))

matrix = []
print("Enter matrix:")
for _ in range(r):
    matrix.append(list(map(int, input().split())))

c1 = matrix[0][0]
c2 = matrix[0][c-1]
c3 = matrix[r-1][0]
c4 = matrix[r-1][c-1]

corner_sum = c1 + c2 + c3 + c4

print("Corner elements:", c1, c2, c3, c4)
print("Corner Sum =", corner_sum)
