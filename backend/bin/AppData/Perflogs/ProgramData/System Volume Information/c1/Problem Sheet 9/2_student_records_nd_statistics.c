#include <stdio.h>
#include <string.h>

struct Student {
    int id;
    char name[30];
    char sex;
    float quiz1, quiz2, midterm, final, total;
};

// Function prototypes
void addRecord(struct Student s[], int *n);
void displayAll(struct Student s[], int n);
void maxScore(struct Student s[], int n);
void minScore(struct Student s[], int n);

int main() {
    struct Student s[20];
    int n = 0, choice;

    do {
        printf("\n--- MENU ---\n");
        printf("1. Add Student\n");
        printf("2. View All Students\n");
        printf("3. Show Max Total Score\n");
        printf("4. Show Min Total Score\n");
        printf("5. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: addRecord(s, &n); break;
            case 2: displayAll(s, n); break;
            case 3: maxScore(s, n); break;
            case 4: minScore(s, n); break;
            case 5: printf("Exiting...\n"); break;
            default: printf("Invalid choice!\n");
        }
    } while (choice != 5);

    return 0;
}

void addRecord(struct Student s[], int *n) {
    printf("\nEnter Student ID: ");
    scanf("%d", &s[*n].id);
    printf("Enter Name: ");
    scanf("%s", s[*n].name);
    printf("Enter Sex (M/F): ");
    scanf(" %c", &s[*n].sex);
    printf("Enter Quiz1, Quiz2, Midterm, Final marks: ");
    scanf("%f %f %f %f", &s[*n].quiz1, &s[*n].quiz2, &s[*n].midterm, &s[*n].final);
    s[*n].total = s[*n].quiz1 + s[*n].quiz2 + s[*n].midterm + s[*n].final;
    (*n)++;
    printf("Record added successfully!\n");
}

void displayAll(struct Student s[], int n) {
    printf("\nID\tName\tSex\tTotal\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%s\t%c\t%.2f\n", s[i].id, s[i].name, s[i].sex, s[i].total);
    }
}

void maxScore(struct Student s[], int n) {
    int maxIndex = 0;
    for (int i = 1; i < n; i++)
        if (s[i].total > s[maxIndex].total)
            maxIndex = i;
    printf("\nTop Student: %s with total %.2f\n", s[maxIndex].name, s[maxIndex].total);
}

void minScore(struct Student s[], int n) {
    int minIndex = 0;
    for (int i = 1; i < n; i++)
        if (s[i].total < s[minIndex].total)
            minIndex = i;
    printf("\nLowest Student: %s with total %.2f\n", s[minIndex].name, s[minIndex].total);
}
