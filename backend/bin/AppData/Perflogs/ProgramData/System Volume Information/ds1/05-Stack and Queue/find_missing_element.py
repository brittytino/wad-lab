if __name__ == "__main__":
    n = int(input("Enter N: "))
    arr = list(map(int, input("Enter N-1 distinct integers 1..N: ").split()))
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(arr)
    print("Missing element:", expected_sum - actual_sum)
