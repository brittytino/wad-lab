# peak_element_index.py

def find_peak(arr):
    n = len(arr)
    low, high = 0, n - 1
    while low <= high:
        mid = (low + high) // 2
        left_ok = (mid == 0) or (arr[mid] >= arr[mid - 1])
        right_ok = (mid == n - 1) or (arr[mid] >= arr[mid + 1])
        if left_ok and right_ok:
            return mid
        elif mid > 0 and arr[mid - 1] > arr[mid]:
            high = mid - 1
        else:
            low = mid + 1
    return -1

if __name__ == "__main__":
    arr = list(map(int, input("Enter array elements: ").replace(',', ' ').split()))
    idx = find_peak(arr)
    if idx == -1:
        print("No peak found (should not happen for valid arrays).")
    else:
        print("Peak index:", idx)
        print("Peak value:", arr[idx])
