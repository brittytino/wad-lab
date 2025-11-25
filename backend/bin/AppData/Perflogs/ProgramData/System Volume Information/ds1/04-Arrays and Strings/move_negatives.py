# move_negatives.py

if __name__ == "__main__":
    arr = list(map(int, input("Enter array elements: ").replace(',', ' ').split()))
    positives = []
    negatives = []

    for x in arr:
        if x >= 0:
            positives.append(x)
        else:
            negatives.append(x)

    result = positives + negatives
    print("Array after moving negatives to end (order preserved):")
    print(*result)
