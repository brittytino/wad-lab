#include <stdio.h>

struct Date {
    int day, month, year;
};

struct Employee {
    char name[30];
    struct Date doj;
    float salary;
    int hours;
};

int main() {
    struct Employee emp[10];
    int n, currentYear = 2025;

    printf("Enter number of employees: ");
    scanf("%d", &n);

    for (int i = 0; i < n; i++) {
        printf("\nEnter details for employee %d:\n", i + 1);
        printf("Name: ");
        scanf("%s", emp[i].name);
        printf("Date of Joining (dd mm yyyy): ");
        scanf("%d %d %d", &emp[i].doj.day, &emp[i].doj.month, &emp[i].doj.year);
        printf("Salary: ");
        scanf("%f", &emp[i].salary);
        printf("Hours of work per day: ");
        scanf("%d", &emp[i].hours);

        int experience = currentYear - emp[i].doj.year;
        float increase = 0;

        if (experience < 5)
            increase = 50;
        else if (experience >= 5 && experience <= 10)
            increase = 100;
        else
            increase = 150;

        emp[i].salary += increase;
    }

    printf("\nName\tFinal Salary\n");
    for (int i = 0; i < n; i++) {
        printf("%s\t%.2f\n", emp[i].name, emp[i].salary);
    }

    return 0;
}
