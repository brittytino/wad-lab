# sparse_matrix.py

rows = int(input("Enter number of rows: "))
cols = int(input("Enter number of columns: "))

matrix = []
zero_count = 0

print("Enter matrix elements row by row:")
for i in range(rows):
    row = list(map(int, input().split()))
    matrix.append(row)
    zero_count += row.count(0)

if zero_count >= (rows * cols) // 2:
    print("The given matrix is Sparse matrix")
else:
    print("The given matrix is NOT a Sparse matrix")
