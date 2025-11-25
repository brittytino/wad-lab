def addr_lower_triangular(n, i, j):
    if i < j:
        return None
    # number of elements before row i: (i-1)*i/2
    return (i - 1) * i // 2 + j

def addr_toeplitz(n, i, j):
    # store first row (n elements) then first column (excluding a11) => total 2n-1
    if i <= j:
        # use first row: index j - i (0-based)
        return j - i
    else:
        # use first column: index n + (i - j - 1)
        return n + (i - j - 1)

def addr_tridiagonal(n, i, j):
    # store 3 diagonals in array of size 3n-2
    if i - j == 0:       # main diagonal
        return n - 1 + i  # positions n .. 2n-1 (1-based i)
    elif i - j == 1:     # below main (sub-diagonal)
        return 2 * n - 1 + j  # positions 2n .. 3n-2
    elif j - i == 1:     # above main (super-diagonal)
        return j - 1      # positions 0 .. n-2
    else:
        return None

if __name__ == "__main__":
    print("1.Lower Triangular 2.Toeplitz 3.Tridiagonal")
    ch = input("Choice: ")
    n = int(input("Enter n (matrix n x n): "))
    i = int(input("Enter i (1-based row): "))
    j = int(input("Enter j (1-based col): "))

    if ch == '1':
        idx = addr_lower_triangular(n, i, j)
    elif ch == '2':
        idx = addr_toeplitz(n, i, j)
    elif ch == '3':
        idx = addr_tridiagonal(n, i, j)
    else:
        idx = None

    if idx is None:
        print("Element not stored in compact array.")
    else:
        print("Linear index in 1D storage (0-based):", idx)
