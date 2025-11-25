# reverse_words.py

s = input("Enter a string: ")

# split() without arguments splits on any spaces and removes extra spaces
words = s.split()

# Reverse word order
words.reverse()

# Join back with single spaces
result = " ".join(words)

print("Reversed words:", result)
