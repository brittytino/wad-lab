#include <stdio.h>
#include <string.h>

struct Employee {
    int empID;
    char name[30];
    float salary;
    int rating;
};

// Function to calculate bonus
float calcBonus(float salary, int rating) {
    switch (rating) {
        case 1: return salary * 0.05;
        case 2: return salary * 0.10;
        case 3: return salary * 0.15;
        case 4: return salary * 0.20;
        case 5: return salary * 0.25;
        default: return 0;
    }
}

int main() {
    int n;
    printf("Enter number of employees: ");
    scanf("%d", &n);

    struct Employee e[n];

    for (int i = 0; i < n; i++) {
        printf("\nEnter details for employee %d:\n", i + 1);
        printf("Employee ID: ");
        scanf("%d", &e[i].empID);
        printf("Name: ");
        scanf("%s", e[i].name);
        printf("Salary: ");
        scanf("%f", &e[i].salary);
        printf("Performance rating (1-5): ");
        scanf("%d", &e[i].rating);
    }

    printf("\nEmpID\tName\tSalary\tBonus\n");
    for (int i = 0; i < n; i++) {
        float bonus = calcBonus(e[i].salary, e[i].rating);
        printf("%d\t%s\t%.2f\t%.2f\n", e[i].empID, e[i].name, e[i].salary, bonus);
    }

    return 0;
}
