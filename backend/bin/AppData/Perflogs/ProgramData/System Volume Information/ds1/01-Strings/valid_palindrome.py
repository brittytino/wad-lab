# valid_palindrome.py

s = input("Enter a string: ")

filtered = ""
for ch in s:
    if ch.isalnum():
        filtered += ch.lower()

# Check if filtered string is same as its reverse
if filtered == filtered[::-1]:
    print("True (Palindrome)")
else:
    print("False (Not a palindrome)")
