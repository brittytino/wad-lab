#include <stdio.h>
#include <string.h>

struct Phone {
    char firstName[10];
    char lastName[10];
    char phoneNumber[15];
};

int comparePhones(struct Phone p1, struct Phone p2) {
    if (strcmp(p1.phoneNumber, p2.phoneNumber) == 0)
        return 1; 
    else
        return 0; 
}

int main() {
    struct Phone person1, person2;

    printf("Enter details for Person 1:\n");
    printf("First name: ");
    scanf("%s", person1.firstName);
    printf("Last name: ");
    scanf("%s", person1.lastName);
    printf("Phone number: ");
    scanf("%s", person1.phoneNumber);

    printf("\nEnter details for Person 2:\n");
    printf("First name: ");
    scanf("%s", person2.firstName);
    printf("Last name: ");
    scanf("%s", person2.lastName);
    printf("Phone number: ");
    scanf("%s", person2.phoneNumber);

    if (comparePhones(person1, person2))
        printf("\nBoth have the SAME phone number.\n");
    else
        printf("\nPhone numbers are DIFFERENT.\n");

    return 0;
}
