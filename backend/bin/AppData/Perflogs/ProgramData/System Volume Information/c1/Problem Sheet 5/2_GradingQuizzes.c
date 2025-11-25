#include <stdio.h>

int main() {
    int numQuestions, i, correct = 0;
    char choice;

    printf("Enter number of questions in the quiz: ");
    scanf("%d", &numQuestions);

    int key[numQuestions];

    // Enter correct answers (key)
    printf("Enter the correct answers (key): ");
    for (i = 0; i < numQuestions; i++) {
        scanf("%d", &key[i]);
    }

    do {
        correct = 0;
        printf("\nEnter student's answers: ");
        for (i = 0; i < numQuestions; i++) {
            int answer;
            scanf("%d", &answer);
            if (answer == key[i])
                correct++;
        }

        float percent = (correct / (float)numQuestions) * 100;
        printf("Number Correct: %d\nPercentage: %.2f%%\n", correct, percent);

        printf("Grade another quiz? (y/n): ");
        scanf(" %c", &choice);
    } while (choice == 'y' || choice == 'Y');

    printf("\nExiting Grading Program.\n");
    return 0;
}
