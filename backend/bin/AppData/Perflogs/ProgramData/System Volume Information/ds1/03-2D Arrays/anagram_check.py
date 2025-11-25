# anagram_check.py

s1 = input("Enter first string: ")
s2 = input("Enter second string: ")

if sorted(s1) == sorted(s2):
    print("The given strings are Anagrams")
else:
    print("The given strings are NOT Anagrams")
