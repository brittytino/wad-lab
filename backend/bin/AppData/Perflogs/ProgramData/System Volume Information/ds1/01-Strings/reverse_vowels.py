# reverse_vowels.py

s = input("Enter a string: ")

vowels = "aeiouAEIOU"
chars = list(s)

# Collect vowel indices and characters
vowel_indices = []
vowel_chars = []

i = 0
while i < len(chars):
    if chars[i] in vowels:
        vowel_indices.append(i)
        vowel_chars.append(chars[i])
    i += 1

# Reverse the list of vowel characters
vowel_chars.reverse()

# Put them back into the original positions
k = 0
while k < len(vowel_indices):
    idx = vowel_indices[k]
    chars[idx] = vowel_chars[k]
    k += 1

result = "".join(chars)
print("String after reversing vowels:", result)
