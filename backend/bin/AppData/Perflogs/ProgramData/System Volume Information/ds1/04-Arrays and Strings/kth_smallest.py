# kth_smallest.py

import random

def quickselect(arr, k):
    # k is 0-based index
    if len(arr) == 1:
        return arr[0]

    pivot = random.choice(arr)
    lows = [x for x in arr if x < pivot]
    highs = [x for x in arr if x > pivot]
    pivots = [x for x in arr if x == pivot]

    if k < len(lows):
        return quickselect(lows, k)
    elif k < len(lows) + len(pivots):
        return pivots[0]
    else:
        return quickselect(highs, k - len(lows) - len(pivots))

if __name__ == "__main__":
    n = int(input("Enter number of elements: "))
    arr = list(map(int, input("Enter distinct elements: ").replace(',', ' ').split()))
    k = int(input("Enter K (1-based): "))

    if k < 1 or k > len(arr):
        print("Invalid K")
    else:
        kth = quickselect(arr, k - 1)
        print(f"{k}-th smallest element is:", kth)
