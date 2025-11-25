# gymnastics_score.py

print("Enter 8 scores out of ten points (space separated):")
scores_input = input()
scores_str_list = scores_input.split()
scores = []
for x in scores_str_list:
    scores.append(float(x))

if len(scores) != 8:
    print("You must enter exactly 8 scores.")
else:
    # Find lowest and highest
    lowest = scores[0]
    highest = scores[0]
    total = 0.0

    for val in scores:
        total += val
        if val < lowest:
            lowest = val
        if val > highest:
            highest = val

    total_after_dropping = total - lowest - highest
    average_after_dropping = total_after_dropping / 6.0

    print("Your lowest score is {:.2f}".format(lowest))
    print("Your maximum score is {:.2f}".format(highest))
    print("Your total point is {:.2f}".format(total_after_dropping))
    print("Your average point is {:.2f}".format(average_after_dropping))
