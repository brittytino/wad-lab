# length_last_word.py

s = input("Enter a string: ")

# Remove leading/trailing spaces
s = s.strip()

# Split by spaces into words
words = s.split()

# Last word is at index -1
last_word = words[-1]
print("Length of last word:", len(last_word))
