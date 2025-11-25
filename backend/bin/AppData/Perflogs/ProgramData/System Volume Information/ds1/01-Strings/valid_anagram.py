# valid_anagram.py

s = input("Enter first string (s): ")
t = input("Enter second string (t): ")

if sorted(s) == sorted(t):
    print("True (Anagram)")
else:
    print("False (Not an anagram)")
