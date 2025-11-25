def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def binary_search(arr, low, high, x):
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == x:
        return mid
    elif arr[mid] > x:
        return binary_search(arr, low, mid - 1, x)
    else:
        return binary_search(arr, mid + 1, high, x)

def tower_of_hanoi(n, src, aux, dest):
    if n == 1:
        print("Move disk 1 from", src, "to", dest)
        return
    tower_of_hanoi(n - 1, src, dest, aux)
    print("Move disk", n, "from", src, "to", dest)
    tower_of_hanoi(n - 1, aux, src, dest)

if __name__ == "__main__":
    while True:
        print("\n1.Factorial 2.Fibonacci 3.Binary Search 4.Tower of Hanoi 5.Exit")
        ch = input("Choice: ")
        if ch == '1':
            n = int(input("n: "))
            print("Factorial:", factorial(n))
        elif ch == '2':
            n = int(input("n: "))
            print("Fibonacci(", n, ") =", fibonacci(n))
        elif ch == '3':
            arr = list(map(int, input("Enter sorted array: ").split()))
            x = int(input("Search element: "))
            idx = binary_search(arr, 0, len(arr) - 1, x)
            print("Index:", idx)
        elif ch == '4':
            n = int(input("Number of disks: "))
            tower_of_hanoi(n, 'A', 'B', 'C')
        elif ch == '5':
            break
        else:
            print("Invalid")
