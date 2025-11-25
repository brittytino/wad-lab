def is_wcwr(s):
    # length must be even
    if len(s) % 2 != 0:
        return False
    mid = len(s) // 2
    w = s[:mid]
    wr = s[mid:]
    # w must be only a,b
    for ch in w:
        if ch not in ('a', 'b'):
            return False
    return wr == w[::-1]

if __name__ == "__main__":
    s = input("Enter string: ")
    print("Matches wcwr pattern?", is_wcwr(s))
