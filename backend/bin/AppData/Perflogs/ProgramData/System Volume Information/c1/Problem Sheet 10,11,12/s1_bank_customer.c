#include <stdio.h>
#include <string.h>

#define MAX_CUSTOMERS 100

struct customer {
    int acc_no;
    char name[30];
    char address[50];
    char dob[11];  // dd-mm-yyyy
    float balance;
};

int find_index(struct customer c[], int n, int acc_no) {
    for (int i = 0; i < n; i++)
        if (c[i].acc_no == acc_no)
            return i;
    return -1;
}

int main(void) {
    struct customer c[MAX_CUSTOMERS];
    int n = 0, choice, acc_no, idx;
    float amt;

    while (1) {
        printf("\nMENU\n");
        printf("1. Account creation\n");
        printf("2. Balance enquiry\n");
        printf("3. Deposit\n");
        printf("4. Withdrawal\n");
        printf("5. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        if (choice == 1) {
            if (n >= MAX_CUSTOMERS) {
                printf("No more accounts can be created.\n");
                continue;
            }
            printf("Enter Account Number: ");
            scanf("%d", &c[n].acc_no);
            printf("Enter Name (no spaces): ");
            scanf("%s", c[n].name);
            printf("Enter Address (no spaces): ");
            scanf("%s", c[n].address);
            printf("Enter DOB (dd-mm-yyyy): ");
            scanf("%s", c[n].dob);
            printf("Enter Initial Balance: ");
            scanf("%f", &c[n].balance);
            n++;
            printf("Account created.\n");

        } else if (choice == 2) {
            printf("Enter Account Number: ");
            scanf("%d", &acc_no);
            idx = find_index(c, n, acc_no);
            if (idx == -1) {
                printf("Account not found.\n");
            } else {
                printf("Acc No: %d\nName: %s\nAddress: %s\nDOB: %s\nBalance: %.2f\n",
                       c[idx].acc_no, c[idx].name, c[idx].address,
                       c[idx].dob, c[idx].balance);
            }

        } else if (choice == 3) {
            printf("Enter Account Number: ");
            scanf("%d", &acc_no);
            idx = find_index(c, n, acc_no);
            if (idx == -1) {
                printf("Account not found.\n");
            } else {
                printf("Enter amount to deposit: ");
                scanf("%f", &amt);
                c[idx].balance += amt;
                printf("New balance: %.2f\n", c[idx].balance);
            }

        } else if (choice == 4) {
            printf("Enter Account Number: ");
            scanf("%d", &acc_no);
            idx = find_index(c, n, acc_no);
            if (idx == -1) {
                printf("Account not found.\n");
            } else {
                printf("Enter amount to withdraw: ");
                scanf("%f", &amt);
                if (c[idx].balance - amt < 500) {
                    printf("Minimum balance of 500 must be maintained.\n");
                } else {
                    c[idx].balance -= amt;
                    printf("New balance: %.2f\n", c[idx].balance);
                }
            }

        } else if (choice == 5) {
            break;
        } else {
            printf("Invalid choice.\n");
        }
    }
    return 0;
}
