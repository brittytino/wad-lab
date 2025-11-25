#include <stdio.h>

int main() {
    int n, sum = 0;
    printf("Enter a positive integer: ");
    if (scanf("%d", &n) != 1 || n <= 0) {
        printf("Invalid input\n");
        return 0;
    }

    for (int i = 1; i <= n; i++) {
        sum += i * (n - i + 1);
    }
    printf("Sum = %d\n", sum);

    return 0;
}
