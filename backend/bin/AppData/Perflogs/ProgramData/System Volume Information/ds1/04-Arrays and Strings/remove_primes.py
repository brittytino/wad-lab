# remove_primes.py

def is_prime(n):
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2
    return True

def parse_int_list(s):
    s = s.replace(',', ' ')
    return list(map(int, s.split()))

if __name__ == "__main__":
    n = int(input("Enter number of elements: "))
    arr = parse_int_list(input("Enter array elements: "))

    if len(arr) != n:
        print("Warning: number of elements entered != n, using entered elements only.")

    result = [x for x in arr if not is_prime(x)]

    print("Array elements after removing prime numbers:")
    for x in result:
        print(x)
