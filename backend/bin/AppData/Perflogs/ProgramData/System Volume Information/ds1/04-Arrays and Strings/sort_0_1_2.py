# sort_0_1_2.py

if __name__ == "__main__":
    arr = list(map(int, input("Enter elements (only 0,1,2): ").replace(',', ' ').split()))
    low = mid = 0
    high = len(arr) - 1

    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:  # arr[mid] == 2
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1

    print("Sorted array:")
    print(*arr)
