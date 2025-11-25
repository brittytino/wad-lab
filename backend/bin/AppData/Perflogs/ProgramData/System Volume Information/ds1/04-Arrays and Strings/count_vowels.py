# count_vowels.py

name = input("Enter your name: ")
vowels = "aeiouAEIOU"
count = 0
for ch in name:
    if ch in vowels:
        count += 1

print("Number of vowels:", count)
