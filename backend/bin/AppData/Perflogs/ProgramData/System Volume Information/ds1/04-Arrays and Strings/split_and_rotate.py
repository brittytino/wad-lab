# split_and_rotate.py

def parse_int_list(s):
    s = s.replace(',', ' ')
    return list(map(int, s.split()))

if __name__ == "__main__":
    n = int(input("Enter n: "))
    arr = parse_int_list(input("Enter array elements: "))
    pos = int(input("Enter position to split (number of elements in first part): "))

    if len(arr) != n:
        print("Warning: number of elements entered != n, using entered elements only.")

    if pos < 0:
        pos = 0
    if pos > len(arr):
        pos = len(arr)

    first = arr[:pos]
    second = arr[pos:]
    result = second + first

    print("Array after split & rotate:")
    print(*result)
