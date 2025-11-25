# longest_substring_k_repeats.py

s = input("Enter string (lowercase letters): ")
k = int(input("Enter k: "))

def longest_substring_at_least_k(s, k):
    if len(s) == 0 or len(s) < k:
        return 0

    # Count frequencies
    freq = {}
    for ch in s:
        if ch in freq:
            freq[ch] += 1
        else:
            freq[ch] = 1

    # Find a character that occurs less than k times
    split_char = None
    for ch in freq:
        if freq[ch] < k:
            split_char = ch
            break

    # If all characters meet the requirement
    if split_char is None:
        return len(s)

    # Split the string at split_char and solve for each part
    parts = s.split(split_char)
    max_len = 0
    for part in parts:
        length = longest_substring_at_least_k(part, k)
        if length > max_len:
            max_len = length

    return max_len

answer = longest_substring_at_least_k(s, k)
print("Length of longest substring:", answer)
